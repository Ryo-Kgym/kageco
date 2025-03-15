import { redirect } from "next/navigation";
import { type YYYY_MM_DD, YYYYmmDD } from "@/type/date/date";
import { convertToYmd } from "@/core/function/date/convertToYmd";

import { MonthlySummaryServer } from "../../../../features/householdMonthlySummary/components/MonthlySummaryServer";
import { getPast12MonthYyyyMMdd } from "../../../../function/date/getPast12MonthYyyyMMdd";
import { paths } from "../../../../routing/paths";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    from: YYYY_MM_DD | undefined;
    to: YYYY_MM_DD | undefined;
  }>;
}) => {
  const { from, to } = await searchParams;

  // fromDateとtoDateがない場合は、デフォルト値を設定してリダイレクト
  if (!from || !to) {
    const defaultFromDate = getPast12MonthYyyyMMdd();
    const defaultToDate = new YYYYmmDD(convertToYmd(new Date()));
    
    const fromParam = from || defaultFromDate.toString();
    const toParam = to || defaultToDate.toString();
    
    const redirectUrl = `${paths.household.monthlySummary.root()}?from=${fromParam}&to=${toParam}`;
    redirect(redirectUrl);
  }

  const convertToDate = (date: YYYY_MM_DD | undefined) => {
    return date ? new YYYYmmDD(date) : undefined;
  };

  return (
    <MonthlySummaryServer
      fromDate={convertToDate(from)}
      toDate={convertToDate(to)}
    />
  );
};

export default Page;
