import type { YYYYmmDD } from "@/util/date/date";

import { fetchWatchTableData } from "../server/fetchWatchTableData";
import { ChartDetailTableClient } from "./ChartDetailTableClient";

export const ChartDetailTableServer = async ({
  watchFirstDate,
  dateType,
}: {
  watchFirstDate: YYYYmmDD | null;
  dateType: "withdrawalDate" | "settlementDate";
}) => {
  if (!watchFirstDate) {
    return <div>年月を選択してください</div>;
  }

  const { records, incomeTotal, outcomeTotal } = await fetchWatchTableData({
    watchFirstDate,
    dateType,
  });

  return (
    <ChartDetailTableClient
      records={records}
      incomeTotal={incomeTotal}
      outcomeTotal={outcomeTotal}
    />
  );
};
