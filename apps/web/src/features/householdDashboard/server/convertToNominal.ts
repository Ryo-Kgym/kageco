import "server-only";

import type { GetDetailsByCategoryQuery } from "@v3/graphql/household/schema/query/v5/getDetailsByCategory.generated";

import type { Nominal } from "./fetchDashboardMonthly";

export const convertToNominal = (data: GetDetailsByCategoryQuery): Nominal => {
  const transferCategories = [
    data.group?.transfer?.incomeCategoryId,
    data.group?.transfer?.outcomeCategoryId,
  ];
  const dailyDetails = data.group?.dailyDetails ?? [];
  const creditDetails = data.group?.creditCardDetails ?? [];
  const mergedDetails = [...dailyDetails, ...creditDetails];

  const categories = Array.from(
    new Set(
      mergedDetails
        .filter((d) => !transferCategories.includes(d.category.id))
        .map((d) => d.category.id),
    ),
  );

  let total = 0;
  const details = categories
    .map((categoryId) => {
      const filtered = mergedDetails.filter((d) => d.category.id === categoryId);
      const categoryName = filtered[0]?.category.name ?? "";
      const amount = filtered.reduce((acc, cur) => acc + cur.amount, 0);

      total += amount;
      return {
        id: categoryId,
        name: categoryName,
        amount,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  return {
    total,
    details,
  };
};
