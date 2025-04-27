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
    issueDate: record.issue_date,
    type: record.type,
    companyId: record.company_id,
    dueDate: record.due_date,
    partnerId: record.partner_id,
    partnerCode: record.partner_code,
    refNumber: record.ref_number,
    // 明細情報
    taxCode: record.tax_code,
    accountItemId: record.account_item_id,
    amount: record.amount,
    itemId: record.item_id,
    sectionId: record.section_id,
    tagIds: record.tag_ids,
    description: record.description,
    vat: record.vat,
    // 支払情報
    paymentAmount: record.payment_amount,
    fromWalletableId: record.from_walletable_id,
    fromWalletableType: record.from_walletable_type,
    paymentDate: record.payment_date,
    // 領収書ID
    receiptId: record.receipt_id,
  }));

  // リポジトリとユースケースを作成
  const repository = new RegisterTransactionRepository();
  const usecase = new SubmitFreeeTransactionUsecase(repository);

  try {
    // ユースケースを実行
    return await usecase.execute(freeeRecords);
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
