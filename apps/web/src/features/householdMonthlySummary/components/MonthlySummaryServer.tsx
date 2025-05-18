import { YYYYmmDD } from "@/util/date/date";

import { convertToYmd } from "@/util/date/convertToYmd";
import { getPast12MonthYyyyMMdd } from "@/util/date/getPast12MonthYyyyMMdd";
import { findAccountIds } from "../../../persistence/browser/server/findAccountIds";
import { findCategoryIds } from "../../../persistence/browser/server/findCategoryIds";
import { fetchMonthlySummaryRecords } from "../server/fetchMonthlySummaryRecords";
import { MonthlySummaryForm } from "./MonthlySummaryForm";
import { MonthlySummaryTable } from "./MonthlySummaryTable";

export const MonthlySummaryServer = async ({
  fromDate = getPast12MonthYyyyMMdd(),
  toDate = new YYYYmmDD(convertToYmd(new Date())),
}: {
  fromDate: YYYYmmDD | undefined;
  toDate: YYYYmmDD | undefined;
}) => {
  const categoryIds = await findCategoryIds();
  const accountIds = await findAccountIds();

  const { columns, details, total } = await fetchMonthlySummaryRecords(
    fromDate,
    toDate,
    categoryIds,
    accountIds,
  );

  return (
    <div>
      <MonthlySummaryForm
        fromDate={fromDate?.parseDate()}
        toDate={toDate?.parseDate()}
        categoryIds={categoryIds}
        accountIds={accountIds}
      />
      <MonthlySummaryTable
        columns={columns}
        records={details}
        totals={total}
        fromDate={fromDate?.toString()}
        toDate={toDate?.toString()}
      />
    </div>
  );
};
