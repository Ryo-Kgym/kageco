export type RegisterDealDto = {
  // 基本情報
  issueDate: string;
  type: "income" | "expense";
  companyId: number;
  dueDate: string | null;
  partnerId: number | null;
  partnerCode: string | null;
  refNumber: string | null;
  // 明細情報
  details: Array<{
    taxCode: number;
    accountItemId: number;
    amount: number;
    itemId: number | null;
    sectionId: number | null;
    tagIds: number[] | null;
    description: string | null;
    vat: number | null;
  }>;
  // 支払情報
  payments: Array<{
    amount: number;
    fromWalletableId: number;
    fromWalletableType: "bank_account" | "credit_card" | "wallet" | "private_account_item";
    date: string;
  }> | null;
  // 領収書ID
  receiptIds: number[] | null;
};
