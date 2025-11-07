import { Text, View } from "react-native";

import { paths } from "~/app/paths";
import { getYear } from "~/func/date/get-year";
import { useCalcTotal } from "~/hooks/household/detail/useCalcTotal";
import { DashboardFrame } from "./DashboardFrame";

export const YearlyBox = ({ year }: { year: Date }) => {
  const { firstDayOfYear, lastDateNotGreaterThanToday, year: yearNum } = getYear(year);

  const { calcTotal } = useCalcTotal({
    fromDate: firstDayOfYear,
    toDate: lastDateNotGreaterThanToday,
  });
  const { incomeTotal, outcomeTotal, balance } = calcTotal();

  return (
    <DashboardFrame
      label={`${yearNum}年の実績`}
      href={paths.household.rankCategoryYearly({ date: year })}
      size={"50%"}
    >
      <View>
        <View className={"flex-row items-center"}>
          <Text className={"text-center"}>収入</Text>
          <Text className={"w-40 text-right text-lg text-green-500"}>
            {incomeTotal.toLocaleString()}
          </Text>
        </View>
        <View className={"flex-row items-center"}>
          <Text className={"text-center"}>支出</Text>
          <Text className={"w-40 text-right text-lg text-red-500"}>
            {outcomeTotal.toLocaleString()}
          </Text>
        </View>
        <View className={"flex-row items-center"}>
          <Text className={"text-center"}>差引</Text>
          <Text className={"w-40 text-right text-lg"}>{balance.toLocaleString()}</Text>
        </View>
      </View>
    </DashboardFrame>
  );
};
