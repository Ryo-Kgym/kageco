import { convertToYmd } from "@/core/function/date/convertToYmd";
import { YYYYmmDD } from "@/util/date/date";

import { findAccountIds } from "../../../persistence/browser/server/findAccountIds";
import { fetchBalanceList } from "../server/fetchBalanceList";
import { BalanceListTable } from "./BalanceListTable";

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
