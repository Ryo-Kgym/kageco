import { GenreType } from "../../../domain/model/household/GenreType";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import type { CategoryChartData } from "../types";

export const sortByTotal = (data: CategoryChartData, targetMonth: Date): string[] => {
  const yearMonth = targetMonth.toISOString().slice(0, 7); // yyyy-mm

  return Object.entries(data)
    .filter(([_, attr]) => yearMonth in attr.monthlyTotal)
    .filter(
      ([_, attr]) =>
        attr.iocomeType === IocomeType.Outcome &&
        attr.genreType === GenreType.FLUCTUATION &&
        !attr.isTransfer,
    )
    .map(([categoryId, attr]) => ({
      categoryId,
      total: attr.monthlyTotal[yearMonth] ?? 0,
    }))
    .sort((a, b) => b.total - a.total)
    .map((x) => x?.categoryId)
    .slice(0, 10);
};
