import type { DealDto } from "@/core/domain/household/freee/freee-record";
import { RegisterDealsUsecase } from "@/core/usecase/freee/register-deals-usecase";
import { RegisterDealRepository } from "../repository/register-deal-repository";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引データを登録する関数
 */
export const submitDeals = async (records: UnifiedRecord[]) => {
  if (!records || records.length === 0) {
    throw new Error("レコードが提供されていません");
  }

  // UnifiedRecordをRegisterDealsInput形式に変換
  const inputData = records.map((record) => ({
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

  // レコードを取引データに変換
  const dealData = convertToDealData(inputData);

  const repository = new RegisterDealRepository();
  const usecase = new RegisterDealsUsecase(repository);

  try {
    return await usecase.execute(dealData);
  } catch (error) {
    console.error("Error registering data:", error);
    throw error;
  }
};

/**
 * レコードを取引データに変換する
 * @param records 取引レコード
 * @returns 取引データ
 */
function convertToDealData(
  records: Array<{
    id: string;
    issueDate: string;
    type: string;
    companyId: string | null;
    dueDate: string;
    partnerId: string | null;
    partnerCode: string;
    refNumber: string;
    taxCode: string | null;
    accountItemId: string | null;
    amount: string | null;
    itemId: string | null;
    sectionId: string | null;
    tagIds: string[];
    description: string;
    vat: string | null;
    paymentAmount: string | null;
    fromWalletableId: string | null;
    fromWalletableType: string;
    paymentDate: string;
    receiptId: string | null;
  }>,
): DealDto {
  if (!records || records.length === 0) {
    throw new Error("レコードが提供されていません");
  }

  // レコードを処理して、取引データ形式に変換
  const processedRecords = records.map((record) => {
    // 基本情報は各レコードで同じなので、最初のレコードから取得
    const formData = {
      issueDate: record.issueDate,
      type: record.type,
      companyId: record.companyId
        ? Number.parseInt(record.companyId, 10)
        : null,
      dueDate: record.dueDate,
      partnerId: record.partnerId
        ? Number.parseInt(record.partnerId, 10)
        : null,
      partnerCode: record.partnerCode,
      refNumber: record.refNumber,
    };

    // 明細情報
    const detail = {
      taxCode: record.taxCode ? Number.parseInt(record.taxCode, 10) : null,
      accountItemId: record.accountItemId
        ? Number.parseInt(record.accountItemId, 10)
        : null,
      amount: record.amount ? Number.parseInt(record.amount, 10) : null,
      itemId: record.itemId ? Number.parseInt(record.itemId, 10) : null,
      sectionId: record.sectionId
        ? Number.parseInt(record.sectionId, 10)
        : null,
      tagIds: record.tagIds
        .map((id) => (id ? Number.parseInt(id, 10) : null))
        .filter(Boolean) as number[],
      description: record.description,
      vat: record.vat ? Number.parseInt(record.vat, 10) : null,
    };

    // 支払情報
    const payment = {
      amount: record.paymentAmount
        ? Number.parseInt(record.paymentAmount, 10)
        : null,
      fromWalletableId: record.fromWalletableId
        ? Number.parseInt(record.fromWalletableId, 10)
        : null,
      fromWalletableType: record.fromWalletableType,
      date: record.paymentDate,
    };

    // 領収書ID
    const receiptId = record.receiptId
      ? Number.parseInt(record.receiptId, 10)
      : null;

    return {
      formData,
      detail,
      payment,
      receiptId,
    };
  });

  // 取引データ形式に変換
  return {
    ...processedRecords[0].formData, // 基本情報は最初のレコードから取得
    details: processedRecords.map((record) => record.detail),
    payments: processedRecords.map((record) => record.payment),
    receiptIds: processedRecords
      .map((record) => record.receiptId)
      .filter(Boolean) as number[],
  };
}
