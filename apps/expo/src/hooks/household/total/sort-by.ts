import type { WithAmountType } from "./total-category";

type sortKey = "amount";

export const sortBy: Record<
  sortKey,
  {
    [orientation in "asc" | "desc"]: (a: WithAmountType, b: WithAmountType) => number;
  }
> = {
  amount: {
    asc: (a, b) => (a.amount > b.amount ? 1 : -1),
    desc: (a, b) => (a.amount < b.amount ? 1 : -1),
  },
};
