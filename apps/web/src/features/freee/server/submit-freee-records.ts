import type { FreeeRecord } from "@/core/domain/household/freee/freee-record";
import { SubmitFreeeTransactionUsecase } from "@/core/usecase/freee/submit-freee-transaction-usecase";
import { RegisterTransactionRepository } from "../repository/register-transaction-repository";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引データを送信する関数
 */
export const submitFreeeRecords = async (records: UnifiedRecord[]) => {
  if (!records || records.length === 0) {
    throw new Error("レコードが提供されていません");
  }

  // UnifiedRecordをFreeeRecordに変換
  const freeeRecords: FreeeRecord[] = records.map((record) => ({
    id: record.id,
    // 基本情報
    issueDate: record.issueDate,
    type: record.type,
    companyId: record.companyId,
    dueDate: record.dueDate,
    partnerId: record.partnerId,
    partnerCode: record.partnerCode,
    refNumber: record.refNumber,
    // 明細情報
    taxCode: record.taxCode,
    accountItemId: record.accountItemId,
    amount: record.amount,
    itemId: record.itemId,
    sectionId: record.sectionId,
    tagIds: record.tagIds,
    description: record.description,
    vat: record.vat,
    // 支払情報
    paymentAmount: record.paymentAmount,
    fromWalletableId: record.fromWalletableId,
    fromWalletableType: record.fromWalletableType,
    paymentDate: record.paymentDate,
    // 領収書ID
    receiptId: record.receiptId,
  }));

  const repository = new RegisterTransactionRepository();
  const usecase = new SubmitFreeeTransactionUsecase(repository);

  try {
    return await usecase.execute(freeeRecords);
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
