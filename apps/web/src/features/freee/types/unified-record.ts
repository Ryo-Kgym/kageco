/**
 * freeeへ取引登録するためのレコード型定義
 */
export type UnifiedRecord = {
  id: string;
  // 基本情報
  issue_date: string;
  type: string;
  company_id: string;
  due_date: string;
  partner_id: string;
  partner_code: string;
  ref_number: string;
  // 明細情報
  tax_code: string;
  account_item_id: string;
  amount: string;
  item_id: string;
  section_id: string;
  tag_ids: string[];
  description: string;
  vat: string;
  // 支払情報
  payment_amount: string;
  from_walletable_id: string;
  from_walletable_type: string;
  payment_date: string;
  // 領収書ID
  receipt_id: string;
};
