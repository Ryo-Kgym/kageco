import { Text, View } from "react-native";

import { paths } from "~/app/paths";
import { DashboardFrame } from "~/feature/household/dashboard/DashboardFrame";
import { useConvertFavoriteFilter } from "~/hooks/household/favoriteFilter/useConvertFavoriteFilter";
import type { WithAmountType } from "~/hooks/household/total/total-category";
import { useGetCategoryTotal } from "~/hooks/household/total/useGetCategoryTotal";
import { genreTypeArray } from "~/types/genre-type";

export const FavoriteFilterBox = ({ filterId }: { filterId: string }) => {
  const {
    filter: { fromDate, toDate, categoryIdList },
    name,
  } = useConvertFavoriteFilter(filterId);

  const income = useGetCategoryTotal({
    fromDate,
    toDate,
    iocomeType: ["INCOME"],
    genreType: genreTypeArray,
    filter: (d) => categoryIdList.includes(d.categoryId),
  });

  const outcome = useGetCategoryTotal({
    fromDate,
    toDate,
    iocomeType: ["OUTCOME"],
    genreType: genreTypeArray,
    filter: (d) => categoryIdList.includes(d.categoryId),
  });

  const loading =
    income.categoryTotal.length === 0 && outcome.categoryTotal.length === 0;

  if (loading) {
    return null;
  }

  return (
    <DashboardFrame
      label={`${name}`}
      href={paths.household.detailListByFavoriteFilter({ filterId, name })}
      size={"100%"}
      scroll={120}
      footer={
        <View
          className={"pt-1"}
          style={{
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Text className={"w-1/2 pr-2 text-right text-gray-500"}>
            収入：{income.calcTotal().toLocaleString()}
          </Text>
          <Text className={"w-1/2 pr-2 text-right text-gray-500"}>
            支出：{outcome.calcTotal().toLocaleString()}
          </Text>
        </View>
      }
    >
      <View
        style={{
          flexDirection: "row",
          gap: 2,
        }}
      >
        <IocomeBox categoryTotal={income.categoryTotal} />
        <IocomeBox categoryTotal={outcome.categoryTotal} />
      </View>
    </DashboardFrame>
  );
};

const IocomeBox = ({ categoryTotal }: { categoryTotal: WithAmountType[] }) => (
  <View className={"w-1/2"}>
    {categoryTotal
      .sort((a, b) => b.amount - a.amount)
      .map((c, i) => (
        <View key={i.toString()} className={"flex-row items-center"}>
          <Text className={"w-[4%] text-xs"}>{i + 1}</Text>
          <View className={"w-11/12 flex-row items-center justify-between"}>
            <Text className={"text-md text-gray-500"}>
              {c.categoryName.slice(0, 7)}
            </Text>
            <Text className={"text-right text-lg"}>
              {c.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      ))}
  </View>
);
