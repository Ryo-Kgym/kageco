import type { RegisterDealDto } from "@/core/usecase/freee/register-deal-dto";

/**
 * レコードを取引データに変換する
 * @param record 取引レコード
 * @returns 取引データ
 */
export function convertToDealData(
  record: {
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
  },
): RegisterDealDto {
  if (!record) {
    throw new Error("レコードが提供されていません");
  }

  // 基本情報
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

  // レコードを取引データに変換
  return {
    ...formData,
    details: [detail],
    payments: [payment],
    receiptIds: receiptId ? [receiptId] : [],
  };
}
