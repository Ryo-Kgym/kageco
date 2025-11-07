import type { YYYY_MM_DD } from "@/util/date/date";

import { AccountDetailTableServer } from "../../../../../features/householdAccountList/components/AccountDetailTableServer";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    fromDate: YYYY_MM_DD | undefined;
    toDate: YYYY_MM_DD | undefined;
    accountId: string | undefined;
  }>;
}) => {
  const { fromDate, toDate, accountId } = await searchParams;

  return <AccountDetailTableServer fromDate={fromDate} toDate={toDate} accountId={accountId} />;
};

export default Page;
