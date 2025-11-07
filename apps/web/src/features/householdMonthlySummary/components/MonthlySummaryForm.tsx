"use client";

import type { FC } from "react";
import { useState } from "react";

import { convertToYmd } from "@/util/date/convertToYmd";
import { Button } from "../../../components/ui/button/v5";
import { AccountMultipleSelect } from "../../../components/ui/select/AccountMultipleSelect";
import { CategoryMultipleSelect } from "../../../components/ui/select/CategoryMultipleSelect";
import { Modal } from "../../../components/ui/v4/modal";
import { RangeMonthPicker } from "../../../components/ui/v5/date/RangeMonthPicker";
import { saveAccountIds } from "../../../persistence/browser/client/saveAccountIds";
import { saveCategoryIds } from "../../../persistence/browser/client/saveCategoryIds";
import { useNavigation } from "../../../routing/client/useNavigation";

type Props = {
  fromDate: Date;
  toDate: Date;
  categoryIds: string[];
  accountIds: string[];
};

export const MonthlySummaryForm: FC<Props> = ({ fromDate, toDate, categoryIds, accountIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Form>({
    fromDate,
    toDate,
    categoryIds,
    accountIds,
  });
  const { prependParamAndPush } = useNavigation();

  return (
    <div>
      <Button label={"絞り込み"} onClick={() => setIsOpen(true)} type={"add"} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <RangeMonthPicker
            onChange={async ([fromDate, toDate]) => {
              setForm((prev) => ({
                ...prev,
                fromDate: fromDate ?? prev.fromDate,
                toDate: toDate ?? prev.toDate,
              }));
            }}
            label={"期間"}
            defaultValue={[form.fromDate, form.toDate]}
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

          <Button
            label={"検索"}
            onClick={async () => {
              await saveCategoryIds(form.categoryIds);
              await saveAccountIds(form.accountIds);
              prependParamAndPush({
                fromDate: convertToYmd(form.fromDate),
                toDate: convertToYmd(form.toDate),
              });
            }}
            type={"save"}
          />
        </div>
      </Modal>
    </div>
  );
};

type Form = {
  fromDate: Date;
  toDate: Date;
  categoryIds: string[];
  accountIds: string[];
};
