/**
 * freeeへ取引登録するためのレコード型定義
 */
export type UnifiedRecord = {
  id: string;
  // 基本情報
  issueDate: string;
  type: string;
  companyId: string;
  dueDate: string;
  partnerId: string;
  partnerCode: string;
  refNumber: string;
  // 明細情報
  taxCode: string;
  accountItemId: string;
  amount: string;
  itemId: string;
  sectionId: string;
  tagIds: string[];
  description: string;
  vat: string;
  // 支払情報
  paymentAmount: string;
  fromWalletableId: string;
  fromWalletableType: string;
  paymentDate: string;
  // 領収書ID
  receiptId: string;
};
