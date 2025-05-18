import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";

import { ChartDetailTableServer } from "../../../../../features/householdChartDetailTable/components/ChartDetailTableServer";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    watch: string | undefined; // yyyy-mm
    dateType: string | undefined;
  }>;
}) => {
  const { watch, dateType } = await searchParams;

  return (
    <ChartDetailTableServer
      watchFirstDate={watch ? new YYYYmmDD(`${watch}-01` as YYYY_MM_DD) : null}
      dateType={(() => {
        switch (dateType) {
          case "withdrawalDate":
            return "withdrawalDate";
          case "settlementDate":
            return "settlementDate";
          default:
            return "withdrawalDate";
        }
      })()}
    />
  );
};

export default Page;
