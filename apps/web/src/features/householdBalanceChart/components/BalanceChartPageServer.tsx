import { YYYYmmDD } from "@/util/date/date";

import { convertToYmd } from "@/util/date/convertToYmd";
import { getPast12MonthYyyyMMdd } from "@/util/date/getPast12MonthYyyyMMdd";
import { colors } from "../../../styles/colors";
import { fetchBalanceChartData } from "../server/fetchBalanceChartData";
import { BalanceChartClient } from "./BalanceChartClient";

export const BalanceChartPageServer = async ({
  fromDate = getPast12MonthYyyyMMdd(),
  toDate = new YYYYmmDD(convertToYmd(new Date())),
}: {
  fromDate: YYYYmmDD | undefined;
  toDate: YYYYmmDD | undefined;
}) => {
  const { data } = await fetchBalanceChartData({
    fromDate,
    toDate,
  });

  return (
    <BalanceChartClient
      barchartSetting={barchartSetting}
      areaChartSetting={areaChartSetting}
      data={data}
      fromDate={fromDate?.parseDate()}
      toDate={toDate?.parseDate()}
    />
  );
};

const barchartSetting = {
  income: {
    color: colors.balance.income,
    group: "income",
    label: "収入",
  },
  outcome: {
    color: colors.balance.outcome,
    group: "outcome",
    label: "支出",
  },
  deposit: {
    color: colors.balance.deposit,
    group: "outcome",
    label: "積立",
  },
  diff: {
    color: colors.balance.diff,
    group: "diff",
    label: "差",
  },
};

const areaChartSetting = {
  cumulativeAssets: {
    color: colors.cumulative.deposit,
    group: "area",
    label: "積立累積",
  },
  cumulativeCash: {
    color: colors.cumulative.cash,
    group: "area",
    label: "現金累積",
  },
};
