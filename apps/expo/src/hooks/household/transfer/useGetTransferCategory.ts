import { useGetTransferCategoryByQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { IocomeType } from "~/types/iocome-type";

export const useGetTransferCategory = () => {
  const { groupId } = useSaveGroupId();
  const [{ data: transferCategoryData }] = useGetTransferCategoryByQuery({
    variables: {
      groupId,
    },
    requestPolicy: "cache-first",
  });
  const { incomeCategory, outcomeCategory } = transferCategoryData?.transferCategory ?? {};

  return {
    incomeCategory: {
      id: incomeCategory?.categoryId ?? "",
      iocomeType: incomeCategory?.genre.iocomeType as IocomeType,
      genreId: incomeCategory?.genre.genreId ?? "",
    },
    outcomeCategory: {
      id: outcomeCategory?.categoryId ?? "",
      iocomeType: outcomeCategory?.genre.iocomeType as IocomeType,
      genreId: outcomeCategory?.genre.genreId ?? "",
    },
  };
};
