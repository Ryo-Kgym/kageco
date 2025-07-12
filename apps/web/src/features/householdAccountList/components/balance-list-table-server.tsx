import { YYYYmmDD } from "@/util/date/date";

import { convertToYmd } from "@/util/date/convertToYmd";
import { findAccountIds } from "../../../persistence/browser/server/findAccountIds";
import { fetchBalanceList } from "../server/fetchBalanceList";
import { BalanceListTable } from "./balance-list-table";

export const BalanceListTableServer = async ({
  fromDate = new YYYYmmDD("2019-01-01"),
  toDate = new YYYYmmDD(convertToYmd(new Date())),
}: {
  fromDate: YYYYmmDD | undefined;
  toDate: YYYYmmDD | undefined;
}) => {
  const accountIds = await findAccountIds();
  const { records, total } = await fetchBalanceList({
    fromDate,
    toDate,
    accountIds,
  });

  return (
    <BalanceListTable
      balanceRecords={records}
      total={total}
      fromDate={fromDate?.parseDate()}
      toDate={toDate?.parseDate()}
      accountIds={accountIds}
    />
  );
};
