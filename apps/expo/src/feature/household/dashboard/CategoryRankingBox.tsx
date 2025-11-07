import { Text, View } from "react-native";

import { paths } from "~/app/paths";
import { DashboardFrame } from "~/feature/household/dashboard/DashboardFrame";
import { getMonth } from "~/func/date/get-month";
import { useGetCategoryTotal } from "~/hooks/household/total/useGetCategoryTotal";
import type { GenreType } from "~/types/genre-type";
import { getGenreTypeLabel } from "~/types/genre-type";
import type { IocomeType } from "~/types/iocome-type";
import { getLabel } from "~/types/iocome-type";

export const CategoryRankingBox = ({
  month,
  genreType,
  iocomeType,
}: {
  month: Date;
  genreType: GenreType[];
  iocomeType: IocomeType[];
}) => {
  const { firstDayOfMonth, lastDayOfMonth, month: monthNum } = getMonth(month);
  const { categoryTotal, calcTotal } = useGetCategoryTotal({
    fromDate: firstDayOfMonth,
    toDate: lastDayOfMonth,
    iocomeType,
    genreType,
  });

  return (
    <DashboardFrame
      label={`${monthNum}月の${generateTitle({ genreType, iocomeType })}`}
      href={paths.household.categoryRanking({ date: month })}
      size={"50%"}
      scroll={120}
      footer={
        <View className={"pt-1"}>
          <Text className={"text-right text-gray-500"}>合計：{calcTotal().toLocaleString()}</Text>
        </View>
      }
    >
      {categoryTotal
        .sort((a, b) => b.amount - a.amount)
        .map((c, i) => (
          <View key={i.toString()} className={"flex-row items-center"}>
            <Text className={"w-1/12 text-xs"}>{i + 1}</Text>
            <View className={"w-11/12 flex-row items-center justify-between"}>
              <Text className={"text-md text-gray-500"}>{c.categoryName.slice(0, 7)}</Text>
              <Text className={"text-right text-lg"}>{c.amount.toLocaleString()}</Text>
            </View>
          </View>
        ))}
    </DashboardFrame>
  );
};

const generateTitle = ({
  genreType,
  iocomeType,
}: {
  genreType: GenreType[];
  iocomeType: IocomeType[];
}) => {
  return genreType
    .map((g) => getGenreTypeLabel(g))
    .join("・")
    .concat(iocomeType.map((t) => getLabel(t)).join("・"));
};
