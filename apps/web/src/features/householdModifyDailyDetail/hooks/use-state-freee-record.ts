import { type FormEvent, useEffect, useState } from "react";
import type { DailyDetail } from "../../../domain/model/household/DailyDetail";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { submitFreeeDeals } from "../actions/submit-deals-actions";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeレコードの状態管理を行うカスタムフック
 */
export const useStateFreeeRecord = (params: {
  form: DailyDetail | undefined;
  onClose: () => void;
}) => {
  const { form, onClose } = params;
  const [record, setRecord] = useState<UnifiedRecord | null>(null);

  // レコードの初期化
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
  const errorMessage = "データの送信に失敗しました。もう一度お試しください。";

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!record) {
      errorPopup("レコードが初期化されていません");
      return;
    }

    try {
      // サーバーアクションを呼び出してデータを送信
      const result = await submitFreeeDeals([record]);

      if (result.success) {
        successPopup(successMessage);
        onClose();
      } else {
        errorPopup(result.error?.message || errorMessage);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      errorPopup(errorMessage);
    }
  };

  return {
    record,
    handleRecordChange,
    handleSubmit,
  };
};
