import type { FC } from "react";

import { Button } from "../../../components/ui/button/v5";
import { AccountMultipleSelect } from "../../../components/ui/select/AccountMultipleSelect";
import { CategoryMultipleSelect } from "../../../components/ui/select/CategoryMultipleSelect";
import { TagInputWrapper } from "../../../components/ui/tag/TagInputWrapper";
import { DateInput } from "../../../components/ui/v4/dateInput/DateInput";
import { Modal } from "../../../components/ui/v4/modal";
import { convertToYmd } from "../../../function/date/convertToYmd";
import { saveAccountIds } from "../../../persistence/browser/client/saveAccountIds";
import { saveCategoryIds } from "../../../persistence/browser/client/saveCategoryIds";

type SearchFormFormState = {
  fromDate: Date | null;
  toDate: Date | null;
  tags: string[];
  categoryIds: string[];
  accountIds: string[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  form: SearchFormFormState;
  setForm: (
    form:
      | SearchFormFormState
      | ((prev: SearchFormFormState) => SearchFormFormState),
  ) => void;
  onSearch: (query: string) => void;
};

export const SearchFormModal: FC<Props> = ({
  isOpen,
  onClose,
  form,
  setForm,
  onSearch,
}) => {
  const handleSearch = async () => {
    const fromDateQuery =
      form.fromDate && `fromDate=${convertToYmd(form.fromDate)}`;
    const toDateQuery = form.toDate && `toDate=${convertToYmd(form.toDate)}`;
    const tagIdsQuery =
      form.tags.length && `tag=${form.tags.map((tag) => `${tag}`).join(",")}`;
    await saveCategoryIds(form.categoryIds);
    await saveAccountIds(form.accountIds);

    onSearch(
      `?${[fromDateQuery, toDateQuery, tagIdsQuery].filter((noop) => noop).join("&")}`,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
      <Button label={"検索"} onClick={handleSearch} type={"save"} />
    </Modal>
  );
};
