"use client";

import type { FC, PropsWithChildren } from "react";
import { MemoTextArea } from "../../../components/molecules/CustomTextArea/Memo";
import { Button } from "../../../components/ui/button/v5";
import { AmountInput } from "../../../components/ui/numberInput/amount/AmountInput";
import { IocomeTypeSegment } from "../../../components/ui/segment/IocomeTypeSegment";
import { AccountSelect } from "../../../components/ui/select/AccountSelect";
import { CategorySelect } from "../../../components/ui/select/CategorySelect";
import { GenreSelect } from "../../../components/ui/select/GenreSelect";
import { TextInput } from "../../../components/ui/textInput/TextInput";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { useNavigation } from "../../../routing/client/useNavigation";
import { useTemplateForm } from "../hooks/use-template-form";
import { insertTemplate } from "../use-server/insert-template";

type Props = {
  onComplete?: () => void;
};

export const TemplateForm: FC<Props> = ({ onComplete }) => {
  const {
    form,
    setName,
    setIocomeType,
    setGenreId,
    setCategoryId,
    setAccountId,
    setAmount,
    setMemo,
    resetForm,
  } = useTemplateForm();
  const { refresh } = useNavigation();

  const isDisabled =
    !form.name || !form.genreId || !form.categoryId || !form.accountId;

  const handleRegister = async () => {
    try {
      await insertTemplate(form);
      successPopup("テンプレートを登録しました");
      resetForm();
      refresh();
      if (onComplete) {
        onComplete();
      }
    } catch (e) {
      console.error(e);
      errorPopup("テンプレートの登録に失敗しました");
    }
  };

  return (
    <div className={"grid w-full grid-cols-1"}>
      <Field>
        <TextInput
          label="テンプレート名"
          value={form.name}
          setValue={setName}
          required
        />
      </Field>
      <Field>
        <IocomeTypeSegment
          iocomeType={form.iocomeType}
          onChange={setIocomeType}
        />
      </Field>
      <Field>
        <GenreSelect
          iocomeType={form.iocomeType}
          genreId={form.genreId}
          onChange={setGenreId}
        />
      </Field>
      <Field>
        <CategorySelect
          genreId={form.genreId}
          categoryId={form.categoryId}
          onChange={setCategoryId}
        />
      </Field>
      <Field>
        <AccountSelect accountId={form.accountId} onChange={setAccountId} />
      </Field>
      <Field>
        <AmountInput value={form.amount} onChange={setAmount} />
      </Field>
      <Field>
        <MemoTextArea memo={form.memo} setMemo={setMemo} />
      </Field>
      <div className={"grid grid-cols-2 justify-items-center"}>
        <Button
          type={"add"}
          onClick={handleRegister}
          label={"登録"}
          disabled={isDisabled}
        />
        <Button type={"back"} onClick={resetForm} label={"クリア"} />
      </div>
    </div>
  );
};

const Field: FC<PropsWithChildren> = ({ children }) => (
  <div className={"py-2 max-sm:py-1"}>{children}</div>
);
