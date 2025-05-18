import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";

import { BalanceChartPageServer } from "../../../../../features/householdBalanceChart/components/BalanceChartPageServer";
import { CategoryChartServer } from "../../../../../features/householdCategoryChart/components/CategoryChartServer";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    fromDate: YYYY_MM_DD | undefined;
    toDate: YYYY_MM_DD | undefined;
    type: string | undefined;
  }>;
}) => {
  const { type, fromDate, toDate } = await searchParams;

  const convertToDate = (date: YYYY_MM_DD | undefined) => {
    return date ? new YYYYmmDD(date) : undefined;
  };

  switch (type) {
    case "category": {
      return (
        <CategoryChartServer
          fromDate={convertToDate(fromDate)}
          toDate={convertToDate(toDate)}
        />
      );
    }
    default: {
      return (
        <BalanceChartPageServer
          fromDate={convertToDate(fromDate)}
          toDate={convertToDate(toDate)}
        />
      );
    }
  }
};

export default Page;

export const dynamic = "force-dynamic";
