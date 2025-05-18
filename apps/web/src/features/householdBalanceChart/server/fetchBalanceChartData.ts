import type { YYYYmmDD } from "@/util/date/date";
import { ChartDataDocument } from "@v3/graphql/household/schema/query/v5/chartData.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import { cumulateSumBalance } from "./cumulateSumBalance";
import { filterSumBalance } from "./filterSumBalance";
import { sumBalanceData } from "./sumBalanceData";

export const fetchBalanceChartData = async ({
  fromDate,
  toDate,
}: {
  fromDate: YYYYmmDD;
  toDate: YYYYmmDD;
}) => {
  const { group } = await findUser();

  const source = await execQuery(ChartDataDocument, {
    groupId: group.id,
    fromDate: "2019-01-01",
    toDate: toDate.toString(),
  });

  const sumBalance = sumBalanceData(source?.data);
  const cumulative = cumulateSumBalance(sumBalance);
  const filteredCumulative = filterSumBalance(cumulative, fromDate.toString());

  return {
    data: filteredCumulative,
  };
};
