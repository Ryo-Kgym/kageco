/**
 * freeeへ取引登録するためのドメインエンティティ
 */
export type FreeeRecord = {
  id: string;
  // 基本情報
  issueDate: string;
  type: string;
  companyId: string | null;
  dueDate: string;
  partnerId: string | null;
  partnerCode: string;
  refNumber: string;
  // 明細情報
  taxCode: string | null;
  accountItemId: string | null;
  amount: string | null;
  itemId: string | null;
  sectionId: string | null;
  tagIds: string[];
  description: string;
  vat: string | null;
  // 支払情報
  paymentAmount: string | null;
  fromWalletableId: string | null;
  fromWalletableType: string;
  paymentDate: string;
  // 領収書ID
  receiptId: string | null;
};

/**
 * APIリクエスト用のデータ型
 */
export type FreeeApiRequestData = {
  // 基本情報
  issue_date: string;
  type: string;
  company_id: number | null;
  due_date: string;
  partner_id: number | null;
  partner_code: string;
  ref_number: string;
  // 明細情報
  details: Array<{
    tax_code: number | null;
    account_item_id: number | null;
    amount: number | null;
    item_id: number | null;
    section_id: number | null;
    tag_ids: number[];
    description: string;
    vat: number | null;
  }>;
  // 支払情報
  payments: Array<{
    amount: number | null;
    from_walletable_id: number | null;
    from_walletable_type: string;
    date: string;
  }>;
  // 領収書ID
  receipt_ids: number[];
};
