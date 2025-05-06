import type { RegisterDealDto } from "@/core/usecase/freee/register-deal-dto";

/**
 * レコードを取引データに変換する
 * @param record 取引レコード
 * @returns 取引データ
 */
export function convertToDealData(record: {
  id: string;
  issueDate: string;
  type: string;
  companyId: string;
  dueDate: string;
  partnerId: string | null;
  partnerCode: string | null;
  refNumber: string | null;
  taxCode: string;
  accountItemId: string;
  amount: string;
  itemId: string | null;
  sectionId: string | null;
  tagIds: string[] | null;
  description: string | null;
  vat: string | null;
  fromWalletableId: string;
  fromWalletableType: string;
  paymentDate: string;
}): RegisterDealDto {
  if (!record) {
    throw new Error("レコードが提供されていません");
  }

  // 基本情報
  const formData = {
    issueDate: record.issueDate,
    type: record.type as "income" | "expense",
    companyId: Number.parseInt(record.companyId, 10),
    dueDate: record.dueDate,
    partnerId: record.partnerId ? Number.parseInt(record.partnerId, 10) : null,
    partnerCode: record.partnerCode,
    refNumber: record.refNumber,
  };

  // 明細情報
  const detail = {
    taxCode: Number.parseInt(record.taxCode, 10),
    accountItemId: Number.parseInt(record.accountItemId, 10),
    amount: Number.parseInt(record.amount, 10),
    itemId: record.itemId ? Number.parseInt(record.itemId, 10) : null,
    sectionId: record.sectionId ? Number.parseInt(record.sectionId, 10) : null,
    tagIds: record.tagIds?.length
      ? (record.tagIds
          ?.map((id) => (id ? Number.parseInt(id, 10) : null))
          .filter(Boolean) as number[])
      : null,
    description: record.description,
    vat: record.vat ? Number.parseInt(record.vat, 10) : null,
  };

  // 支払情報
  const payment = {
    amount: detail.amount,
    fromWalletableId: Number.parseInt(record.fromWalletableId, 10),
    fromWalletableType: record.fromWalletableType as "bank_account" | "wallet",
    date: record.paymentDate,
  };

  // 領収書ID
  const receiptId = null;

  // レコードを取引データに変換
  return {
    ...formData,
    details: [detail],
    payments: [payment],
    receiptIds: receiptId,
  };
}
