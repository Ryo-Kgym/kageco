import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { paths } from "~/app/paths";
import { FilterModal } from "~/feature/household/rank/category/yearly/FilterModal";
import { getYear } from "~/func/date/get-year";
import { sortBy } from "~/hooks/household/total/sort-by";
import { useGetCategoryTotal } from "~/hooks/household/total/useGetCategoryTotal";
import type { IocomeType } from "~/types/iocome-type";

export const YearlyCategoryRankList = ({ year }: { year: Date }) => {
  const [visible, setVisible] = useState(false);
  const [filterYear, setFilterYear] = useState<number>(year.getFullYear());
  const [iocomeType, setIocomeType] = useState<IocomeType>("INCOME");
  const { push } = useRouter();

  const { firstDayOfYear, lastDateNotGreaterThanToday } = getYear(
    new Date(filterYear, 0, 1, 9),
  );
  const { categoryTotal } = useGetCategoryTotal({
    fromDate: firstDayOfYear,
    toDate: lastDateNotGreaterThanToday,
    iocomeType: [iocomeType],
    sort: sortBy.amount.desc,
  });

  return (
    <>
      <FilterModal
        visible={visible}
        setVisible={setVisible}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        iocomeType={iocomeType}
        setIocomeType={setIocomeType}
        year={year}
      />
      <FlatList
        data={categoryTotal}
        keyExtractor={(item) => item.categoryId}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              push(
                paths.household.detailListByCategory({
                  year,
                  categoryId: item.categoryId,
                }),
              )
            }
          >
            <View
              className={
                "flex-row items-center border-b border-b-gray-300 py-2"
              }
            >
              <Text
                className={"w-1/12 text-right text-sm text-gray-600"}
                style={{ paddingRight: 4 }}
              >
                {index + 1}
              </Text>
              <View className={"w-11/12 flex-row items-center justify-between"}>
                <Text className={"text-xl text-gray-600"}>
                  {item.categoryName}
                </Text>
                <Text
                  className={"text-right text-xl"}
                  style={{ paddingRight: 12 }}
                >
                  {item.amount.toLocaleString()}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </>
  );
};
