import type { YYYY_MM_DD } from "@/util/date/date";
import {
  getThisYearFirstDate,
  getThisYearLastDate,
} from "@/util/date/this-year";
import { SearchListServer } from "../../../../../features/householdSearch/components/search-list-server";

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
    <SearchListServer
      fromDate={fromDate ?? getThisYearFirstDate()}
      toDate={toDate ?? getThisYearLastDate()}
      tagIds={tag?.split(",") ?? []}
      categoryIdsFromUrl={categoryIds?.split(",") ?? []}
    />
  );
};

export default Page;
