"use client";

import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";

import { convertToYmd } from "@/util/date/convertToYmd";
import type { YYYY_MM_DD } from "@/util/date/date";
import { Button } from "../../../components/ui/button/v5";
import { useRouter } from "../../../routing/client/useRouter";
import { paths } from "../../../routing/paths";
import { SearchFormModal } from "./search-form-modal";

type Props = {
  fromDate: YYYY_MM_DD;
  toDate: YYYY_MM_DD;
  tagIds: string[];
  categoryIds: string[];
  accountIds: string[];
};

type SearchFormFormState = {
  fromDate: Date | null;
  toDate: Date | null;
  tags: string[];
  categoryIds: string[];
  accountIds: string[];
};

export const SearchFormClient: FC<Props> = ({
  fromDate,
  toDate,
  tagIds,
  categoryIds,
  accountIds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SearchFormFormState>({
    fromDate: new Date(fromDate),
    toDate: new Date(toDate),
    tags: tagIds,
    categoryIds,
    accountIds,
  });
  const { push } = useRouter();

  const getMonthlySummaryUrl = () => {
    const fromDateQuery =
      form.fromDate && `fromDate=${convertToYmd(form.fromDate)}`;
    const toDateQuery = form.toDate && `toDate=${convertToYmd(form.toDate)}`;

    const queryParams = [fromDateQuery, toDateQuery].filter(Boolean);
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    return `${paths.household.monthlySummary.root()}${queryString}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Button label={"絞り込み"} onClick={() => setIsOpen(true)} type={"add"} />
      <Link
        href={getMonthlySummaryUrl()}
        className="text-blue-600 hover:underline"
      >
        月次サマリーに戻る
      </Link>
      <SearchFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        form={form}
        setForm={setForm}
        onSearch={(query) => push(query)}
      />
    </div>
  );
};
