export type SummaryFormState = {
  creditCard: string;
  withdrawalDate: Date;
  accountId: string;
};

export type SummaryDisplayState = {
  id: string;
  creditCard: string;
  totalAmount: number;
  count: number;
};
