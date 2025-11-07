import { YYYYmmDD } from "@/util/date/date";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { useNavigation } from "../../../routing/client/useNavigation";
import type {
  CreditDetailEditDisplayState,
  CreditDetailEditFormState,
} from "../../householdCreditDetailEdit/types/type";
import { submitDealActions } from "../actions/submit-deal-actions";
import type { UnifiedRecord } from "../types/unified-record";

export const useStateFreeeRecord = (params: {
  formData: CreditDetailEditFormState | undefined;
  display: CreditDetailEditDisplayState | undefined;
  onClose: () => void;
}) => {
  const { formData, display, onClose } = params;
  const [record, setRecord] = useState<UnifiedRecord | null>(null);

  useEffect(() => {
    if (!formData || !display) return;

    const newRecord: UnifiedRecord = {
      id: display.id,
      // 基本情報
      issueDate: YYYYmmDD.valueOf(display.date).toString(),
      type: display.iocomeType === "INCOME" ? "income" : "expense",
      companyId: "",
      dueDate: "",
      partnerId: "",
      partnerCode: "",
      refNumber: "",
      // 明細情報
      taxCode: "",
      accountItemId: "",
      amount: display.amount.toString(),
      itemId: "",
      sectionId: "",
      tagIds: [],
      description: formData.memo || "",
      vat: "",
      // 支払情報
      paymentAmount: display.amount.toString(),
      fromWalletableId: "",
      fromWalletableType: "",
      paymentDate: YYYYmmDD.valueOf(display.withdrawalDate).toString(),
      // 領収書ID
      receiptId: "",
    };

    setRecord(newRecord);
  }, [formData, display]);

  // レコードの入力ハンドラ
  const handleRecordChange = (field: keyof UnifiedRecord, value: string) => {
    if (!record) return;

    const newRecord = { ...record };
    if (field === "tagIds") {
      // tagIdsは配列なので特別に処理
      newRecord[field] = [value];
    } else {
      newRecord[field] = value;
    }
    setRecord(newRecord);
  };
  const { refresh } = useNavigation();

  // メッセージ定義
  const successMessage = "freeeへのデータ送信が完了しました";

  // フォーム送信ハンドラ
  const handleSubmit = async (fromWalletableType: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!record) {
      errorPopup("レコードが初期化されていません");
      return;
    }

    try {
      await submitDealActions({ ...record, fromWalletableType });
      successPopup(successMessage);
      refresh();
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
