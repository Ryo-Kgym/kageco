export type RegisterDealDto = {
  // 基本情報
  issueDate: string;
  type: string;
  companyId: number | null;
  dueDate: string;
  partnerId: number | null;
  partnerCode: string;
  refNumber: string;
  // 明細情報
  details: Array<{
    taxCode: number | null;
    accountItemId: number | null;
    amount: number | null;
    itemId: number | null;
    sectionId: number | null;
    tagIds: number[];
    description: string;
    vat: number | null;
  }>;
  // 支払情報
  payments: Array<{
    amount: number | null;
    fromWalletableId: number | null;
    fromWalletableType: string;
    date: string;
  }>;
  // 領収書ID
  receiptIds: number[];
};
