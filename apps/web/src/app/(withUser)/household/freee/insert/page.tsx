import { FreeeInsertServer } from "../../../../../features/freee/components/freee-insert-server";
import {
  getThisYearFirstDate,
  getThisYearLastDate,
} from "../../../../../function/date/this-year";
import type { YYYY_MM_DD } from "../../../../../types/yyyyMMdd";

/**
 * freeeへ取引登録するページ
 */
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    fromDate: YYYY_MM_DD | undefined;
    toDate: YYYY_MM_DD | undefined;
    tag: string | undefined;
    categoryIds: string | undefined;
  }>;
}) => {
  const { fromDate, toDate, tag, categoryIds } = await searchParams;
  return (
    <FreeeInsertServer
      fromDate={fromDate ?? getThisYearFirstDate()}
      toDate={toDate ?? getThisYearLastDate()}
      tagIds={tag?.split(",") ?? []}
      categoryIdsFromUrl={categoryIds?.split(",") ?? []}
    />
  );
};

export default Page;
