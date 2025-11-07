import type { SumBalance, SumBalanceAttributes } from "./types";

export const cumulateSumBalance = (data: SumBalance) => {
  return Object.entries(data).reduce<
    Record<
      string,
      SumBalanceAttributes & {
        cumulativeCash: number;
        cumulativeAssets: number;
      }
    >
  >((acc, [yearMonth, value]) => {
    const prevCumulative = acc[Object.keys(acc).pop() ?? ""]?.cumulativeCash ?? 0;
    const prevAssets = acc[Object.keys(acc).pop() ?? ""]?.cumulativeAssets ?? 0;
    return {
      ...acc,
      [yearMonth]: {
        ...value,
        cumulativeCash: prevCumulative + value.diff,
        cumulativeAssets: prevAssets + value.deposit,
      },
    };
  }, {});
};
