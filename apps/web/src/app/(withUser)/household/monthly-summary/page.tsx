import { convertToYmd } from "@/core/function/date/convertToYmd";
import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";
import { redirect } from "next/navigation";

import { MonthlySummaryServer } from "../../../../features/householdMonthlySummary/components/MonthlySummaryServer";
import { getPast12MonthYyyyMMdd } from "../../../../function/date/getPast12MonthYyyyMMdd";
import { paths } from "../../../../routing/paths";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    fromDate: YYYY_MM_DD | undefined;
    toDate: YYYY_MM_DD | undefined;
  }>;
}) => {
  const { fromDate, toDate } = await searchParams;

  // fromDateとtoDateがない場合は、デフォルト値を設定してリダイレクト
  if (!fromDate || !toDate) {
    const defaultFromDate = getPast12MonthYyyyMMdd();
    const defaultToDate = new YYYYmmDD(convertToYmd(new Date()));

    const fromParam = fromDate || defaultFromDate.toString();
    const toParam = toDate || defaultToDate.toString();

    const redirectUrl = `${paths.household.monthlySummary.root()}?fromDate=${fromParam}&toDate=${toParam}`;
    redirect(redirectUrl);
  }

  const convertToDate = (date: YYYY_MM_DD | undefined) => {
    return date ? new YYYYmmDD(date) : undefined;
  };

  return (
    <MonthlySummaryServer
      fromDate={convertToDate(fromDate)}
      toDate={convertToDate(toDate)}
    />
  );
};

export default Page;
