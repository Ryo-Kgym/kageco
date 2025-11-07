import type { DetailBase } from "~/hooks/household/detail/detail-base";

export const calcTotal = <T extends DetailBase>(
  data: T[],
  incomeFilter?: (data: T) => boolean,
  outcomeFilter?: (data: T) => boolean,
) => {
  const incomeTotal = data
    .filter(incomeFilter ?? (() => true))
    .reduce((acc, cur) => (cur.iocomeType === "INCOME" ? acc + cur.amount : acc), 0);

  const outcomeTotal = data
    .filter(outcomeFilter ?? (() => true))
    .reduce((acc, cur) => (cur.iocomeType === "OUTCOME" ? acc + cur.amount : acc), 0);

  const balance = incomeTotal - outcomeTotal;

  return {
    incomeTotal,
    outcomeTotal,
    balance,
  };
};
