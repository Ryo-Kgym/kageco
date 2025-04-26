"use client";

import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";

import { Button } from "../../../components/ui/button/v5";
import { convertToYmd } from "../../../function/date/convertToYmd";
import { useRouter } from "../../../routing/client/useRouter";
import { paths } from "../../../routing/paths";
import type { YYYY_MM_DD } from "../../../types/yyyyMMdd";
import { SearchFormModal } from "./SearchFormModal";

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

  return (
    <div className="flex items-center gap-2">
      <Button label={"絞り込み"} onClick={() => setIsOpen(true)} type={"add"} />
      <Link
        href={`${paths.household.monthlySummary.root()}${form.fromDate || form.toDate ? `?fromDate=${form.fromDate ? convertToYmd(form.fromDate) : ""}&toDate=${form.toDate ? convertToYmd(form.toDate) : ""}` : ""}`}
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
