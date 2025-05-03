import { type FormEvent, useEffect, useState } from "react";
import type { DailyDetail } from "../../../domain/model/household/DailyDetail";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { submitDealActions } from "../actions/submit-deal-actions";
import type { UnifiedRecord } from "../types/unified-record";

export const useStateFreeeRecord = (params: {
  form: DailyDetail | undefined;
  onClose: () => void;
}) => {
  const { form, onClose } = params;
  const [record, setRecord] = useState<UnifiedRecord | null>(null);

  useEffect(() => {
    if (!form) return;

    const newRecord: UnifiedRecord = {
      id: form.id,
      // 基本情報
      issueDate: form.date,
      type: form.iocomeType === "INCOME" ? "income" : "expense",
      companyId: "",
      dueDate: "",
      partnerId: "",
      partnerCode: "",
      refNumber: "",
      // 明細情報
      taxCode: "",
      accountItemId: "",
      amount: form.amount.toString(),
      itemId: "",
      sectionId: "",
      tagIds: [],
      description: `${form.categoryName}-${form.memo}`,
      vat: "",
      // 支払情報
      paymentAmount: form.amount.toString(),
      fromWalletableId: "",
      fromWalletableType: "",
      paymentDate: form.date,
      // 領収書ID
      receiptId: "",
    };

    setRecord(newRecord);
  }, [form]);

  // レコードの入力ハンドラ
  const handleRecordChange = (field: string, value: string) => {
    if (!record) return;

    const newRecord = { ...record };
    if (field === "tagIds") {
      // tagIdsは配列なので特別に処理
      newRecord[field] = [value];
    } else {
      // @ts-expect-error
      newRecord[field] = value;
    }
    setRecord(newRecord);
  };

  // メッセージ定義
  const successMessage = "freeeへのデータ送信が完了しました";

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!record) {
      errorPopup("レコードが初期化されていません");
      return;
    }

    try {
      await submitDealActions(record);
      successPopup(successMessage);
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      errorPopup(error as string);
    }
  };

  return {
    record,
    handleRecordChange,
    handleSubmit,
  };
};
