import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";

import { convertToYmd } from "@/util/date/convertToYmd";
import { fetchAccountDetailList } from "../server/fetchAccountDetailList";
import { AccountDetailTable } from "./AccountDetailTable";

export const AccountDetailTableServer = async ({
  fromDate = "2019-01-01",
  toDate = new YYYYmmDD(convertToYmd(new Date())).toString(),
  accountId,
}: {
  fromDate: YYYY_MM_DD | undefined;
  toDate: YYYY_MM_DD | undefined;
  accountId: string | undefined;
}) => {
  if (!accountId) {
    return null;
  }

  const { records, incomeTotal, outcomeTotal } = await fetchAccountDetailList({
    fromDate,
    toDate,
    accountId,
  });

  return (
    <AccountDetailTable
      records={records}
      incomeTotal={incomeTotal}
      outcomeTotal={outcomeTotal}
    />
  );
};
