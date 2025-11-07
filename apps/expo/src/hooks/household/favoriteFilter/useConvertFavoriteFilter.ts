import type { GetFavoriteFilterQuery } from "@v3/graphql/household";
import { useGetFavoriteFilterQuery } from "@v3/graphql/household";

export const useConvertFavoriteFilter = (filterId: string) => {
  const [{ data }] = useGetFavoriteFilterQuery({
    variables: { filterId },
  });

  const categoryIdList = convertCategoryIdList(data);
  const { fromDate, toDate } = convertDate(data);

  return {
    filter: {
      fromDate,
      toDate,
      categoryIdList,
    },
    name: data?.filter?.name ?? "",
  };
};

const convertCategoryIdList = (data: GetFavoriteFilterQuery | undefined) =>
  data?.filter?.args.filter((f) => f.key === "categoryId").map((f) => f.value) ?? [];

const convertDate = (data: GetFavoriteFilterQuery | undefined) => {
  const year = data?.filter?.args.find((f) => f.key === "year")?.value;
  const fromDate = new Date(`${year}-01-01`);
  const toDate = new Date(`${year}-12-31`);

  return { fromDate, toDate };
};
