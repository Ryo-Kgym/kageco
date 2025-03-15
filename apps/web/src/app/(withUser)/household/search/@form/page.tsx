import { SearchFormServer } from "../../../../../features/householdSearch/components/SearchFormServer";
import { findAccountIds } from "../../../../../persistence/browser/server/findAccountIds";
import { findCategoryIds } from "../../../../../persistence/browser/server/findCategoryIds";
import type { YYYY_MM_DD } from "../../../../../types/yyyyMMdd";

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
  const getThisYearFirstDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-01-01` as YYYY_MM_DD;
  };
  const getThisYearLastDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-12-31` as YYYY_MM_DD;
  };

  // URLのクエリパラメータにcategoryIdsが存在する場合はそれを優先して使用
  const categoryIdsArray = categoryIds?.split(",") ?? (await findCategoryIds());
  const accountIds = await findAccountIds();

  return (
    <SearchFormServer
      fromDate={fromDate ?? getThisYearFirstDate()}
      toDate={toDate ?? getThisYearLastDate()}
      tagIds={tag?.split(",") ?? []}
      categoryIds={categoryIdsArray}
      accountIds={accountIds}
    />
  );
};

export default Page;
