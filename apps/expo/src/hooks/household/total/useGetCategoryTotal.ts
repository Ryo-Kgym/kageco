import { useGetDetailsByCategoryQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { sortBy } from "~/hooks/household/total/sort-by";
import type { GenreType } from "~/types/genre-type";
import { genreTypeArray } from "~/types/genre-type";
import type { IocomeType } from "~/types/iocome-type";
import { iocomeTypeArray } from "~/types/iocome-type";
import type { WithAmountType } from "./total-category";
import { totalCategory } from "./total-category";

export const useGetCategoryTotal = ({
  fromDate,
  toDate,
  iocomeType = iocomeTypeArray,
  genreType = genreTypeArray,
  filter = () => true,
  sort = sortBy.amount.desc,
}: {
  fromDate: Date;
  toDate: Date;
  iocomeType?: IocomeType[];
  genreType?: GenreType[];
  filter?: (d: WithAmountType) => boolean;
  sort?: (a: WithAmountType, b: WithAmountType) => number;
}) => {
  const { groupId } = useSaveGroupId();
  const [{ data }] = useGetDetailsByCategoryQuery({
    variables: {
      groupId,
      fromDate,
      toDate,
      iocomeType,
    },
  });

  const dailyDetails =
    data?.group?.dailyDetails.map((d) => ({
      iocomeType: d.genre.iocomeType as IocomeType,
      genreType: d.genre.genreType as GenreType,
      categoryId: d.category.id ?? "",
      categoryName: d.category.name ?? "",
      amount: d.amount as number,
    })) ?? [];

  const creditCardDetails =
    data?.group?.creditCardDetails.map((d) => ({
      iocomeType: d.genre.iocomeType as IocomeType,
      genreType: d.genre.genreType as GenreType,
      categoryId: d.category.id ?? "",
      categoryName: d.category.name ?? "",
      amount: d.amount as number,
    })) ?? [];

  const categoryTotal = totalCategory({
    details: [...dailyDetails, ...creditCardDetails],
    filter: (d) =>
      filter?.(d) &&
      genreType.includes(d.genreType) &&
      // カテゴリ：振替は除外する。
      d.categoryId !== data?.group?.transfer?.incomeCategoryId &&
      d.categoryId !== data?.group?.transfer?.outcomeCategoryId,
  }).sort(sort);

  const calcTotal = () =>
    categoryTotal.reduce((acc, cur) => acc + cur.amount, 0);

  return {
    categoryTotal,
    calcTotal,
  };
};
