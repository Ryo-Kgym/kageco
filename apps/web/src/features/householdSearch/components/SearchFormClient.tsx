"use client";

import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";

import { Button } from "../../../components/ui/button/v5";
import { AccountMultipleSelect } from "../../../components/ui/select/AccountMultipleSelect";
import { CategoryMultipleSelect } from "../../../components/ui/select/CategoryMultipleSelect";
import { TagInputWrapper } from "../../../components/ui/tag/TagInputWrapper";
import { DateInput } from "../../../components/ui/v4/dateInput/DateInput";
import { Modal } from "../../../components/ui/v4/modal";
import { convertToYmd } from "../../../function/date/convertToYmd";
import { saveAccountIds } from "../../../persistence/browser/client/saveAccountIds";
import { saveCategoryIds } from "../../../persistence/browser/client/saveCategoryIds";
import { useRouter } from "../../../routing/client/useRouter";
import { paths } from "../../../routing/paths";
import type { YYYY_MM_DD } from "../../../types/yyyyMMdd";
import { FreeeCsvExportButton } from "./FreeeCsvExportButton";

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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DateInput
          label={"From"}
          value={form.fromDate}
          setValue={(v) =>
            setForm({
              ...form,
              fromDate: v,
            })
          }
        />
        <DateInput
          label={"To"}
          value={form.toDate}
          setValue={(v) =>
            setForm({
              ...form,
              toDate: v,
            })
          }
        />
        <CategoryMultipleSelect
          categoryId={form.categoryIds}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              categoryIds: v,
            }))
          }
        />
        <AccountMultipleSelect
          accountIds={form.accountIds}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              accountIds: v,
            }))
          }
        />
        <TagInputWrapper
          label={"Tags"}
          values={form.tags}
          onChange={(v) => {
            setForm({
              ...form,
              tags: v,
            });
          }}
        />
        <Button
          label={"検索"}
          onClick={async () => {
            const fromDateQuery =
              form.fromDate && `fromDate=${convertToYmd(form.fromDate)}`;
            const toDateQuery =
              form.toDate && `toDate=${convertToYmd(form.toDate)}`;
            const tagIdsQuery =
              form.tags.length &&
              `tag=${form.tags.map((tag) => `${tag}`).join(",")}`;
            const categoryIdsQuery =
              form.categoryIds.length &&
              `categoryIds=${form.categoryIds.join(",")}`;
            await saveCategoryIds(form.categoryIds);
            await saveAccountIds(form.accountIds);

            push(
              `?${[fromDateQuery, toDateQuery, tagIdsQuery, categoryIdsQuery].filter((noop) => noop).join("&")}`,
            );
          }}
          type={"save"}
        />
        <FreeeCsvExportButton />
      </Modal>
    </div>
  );
};
