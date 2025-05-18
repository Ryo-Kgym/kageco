import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";

import { BalanceListTableServer } from "../../../../../features/householdAccountList/components/BalanceListTableServer";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    fromDate: YYYY_MM_DD | undefined;
    toDate: YYYY_MM_DD | undefined;
    accountId: string | undefined;
  }>;
}) => {
  const { fromDate, toDate } = await searchParams;

  return (
    <BalanceListTableServer
      fromDate={fromDate ? new YYYYmmDD(fromDate) : undefined}
      toDate={toDate ? new YYYYmmDD(toDate) : undefined}
    />
  );
};

export default Page;
