import type { CreditCardSummary } from "~/hooks/household/credit_card/credit-card-type";
import { useGetCreditCardSummaryList } from "~/hooks/household/credit_card/useGetCreditCardSummaryList";
import type { Daily } from "~/hooks/household/daily/daily";
import { useGetDailyList } from "~/hooks/household/daily/useGetDailyList";
import type { DetailBase } from "~/hooks/household/detail/detail-base";
import { calcTotal } from "./calc-total";

/**
 * 日付を指定して、その日の明細を取得し、集計する。
 * @param fromDate 抽出開始日
 * @param toDate 抽出終了日
 * @param dailyConverter 日次明細を変換する関数
 * @param creditCardConverter クレジットカードサマリを変換する関数
 */
export const useGetDetails = <T extends DetailBase>({
  fromDate,
  toDate,
  converter: {
    daily: dailyConverter,
    creditCardSummary: creditCardSummaryConverter,
  },
  filter = {
    term: {
      income: () => true,
      outcome: () => true,
    },
  },
}: {
  fromDate: Date;
  toDate: Date;
  converter: {
    daily: (daily: Daily) => T;
    creditCardSummary: (creditCard: CreditCardSummary) => T;
  };
  filter?: {
    term: {
      income: (data: T) => boolean;
      outcome: (data: T) => boolean;
    };
  };
}) => {
  const { dailyDetailList } = useGetDailyList({
    fromDate,
    toDate,
  });

  const { creditCardSummaryList } = useGetCreditCardSummaryList({
    fromDate,
    toDate,
  });

  const getDetailsByDate = (date: Date) => {
    const details: T[] = [
      // 日次明細
      ...dailyDetailList
        .filter(
          (d) =>
            d.date?.toISOString().slice(0, 10) ===
            date.toISOString().slice(0, 10),
        )
        .map(dailyConverter),
      // クレジットカードサマリ
      ...creditCardSummaryList
        .filter(
          (d) =>
            d.withdrawalDate?.toISOString().slice(0, 10) ===
            date.toISOString().slice(0, 10),
        )
        .map(creditCardSummaryConverter),
    ];

    const { incomeTotal, outcomeTotal, balance } = calcTotal(details);

    return {
      details,
      incomeTotal,
      outcomeTotal,
      balance,
    };
  };

  const getDetailsForTerm = () => {
    const details: T[] = [
      // 日次明細
      ...dailyDetailList.map(dailyConverter),
      // クレジットカードサマリ
      ...creditCardSummaryList.map(creditCardSummaryConverter),
    ]
      .filter(filter.term.income)
      .filter(filter.term.outcome);

    const { incomeTotal, outcomeTotal, balance } = calcTotal(details);

    return {
      details,
      incomeTotal,
      outcomeTotal,
      balance,
    };
  };

  return {
    getDetailsByDate,
    getDetailsForTerm,
  };
};
