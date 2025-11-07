import { useGetTransferCategoryByQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { useGetDetails } from "~/hooks/household/detail/useGetDetails";

export const useCalcTotal = ({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) => {
  const { groupId } = useSaveGroupId();

  const [{ data: transData }] = useGetTransferCategoryByQuery({
    variables: {
      groupId,
    },
    requestPolicy: "cache-first",
  });

  const { getDetailsForTerm } = useGetDetails({
    fromDate,
    toDate,
    converter: {
      daily: (d) => ({
        categoryId: d.category.id,
        iocomeType: d.genre.iocomeType,
        amount: d.amount,
      }),
      creditCardSummary: (d) => ({
        categoryId: "",
        iocomeType: d.genre.iocomeType,
        amount: d.total,
      }),
    },
    filter: {
      term: {
        income: (d) => d.categoryId !== transData?.transferCategory?.incomeCategory.categoryId,
        outcome: (d) => d.categoryId !== transData?.transferCategory?.outcomeCategory.categoryId,
      },
    },
  });

  return {
    calcTotal: getDetailsForTerm,
  };
};
