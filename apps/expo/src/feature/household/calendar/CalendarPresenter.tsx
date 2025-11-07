import { FlatList, Pressable, Text, View } from "react-native";

import { MonthChanger } from "~/ui";

export const CalendarPresenter = ({
  baseDate,
  changeHandler,
  days,
}: {
  baseDate: Date;
  changeHandler: (date: Date) => void;
  days: {
    date: Date;
    isToday: boolean;
    isThisMonth: boolean;
    isSelectedDate: boolean;
    income: number;
    outcome: number;
    totalDisabled: boolean;
  }[];
}) => (
  <View>
    <MonthChanger baseDate={baseDate} changeHandler={changeHandler} />
    <FlatList
      data={[
        { label: "日", color: "text-red-500" },
        { label: "月", color: "text-black" },
        { label: "火", color: "text-black" },
        { label: "水", color: "text-black" },
        { label: "木", color: "text-black" },
        { label: "金", color: "text-black" },
        { label: "土", color: "text-blue-500" },
      ]}
      numColumns={7}
      scrollEnabled={false}
      renderItem={(week) => (
        <View className={"w-[14.4%] border-b border-r border-gray-300"}>
          <Text className={`text-center ${week.item.color}`}>{week.item.label}</Text>
        </View>
      )}
    />
    <FlatList
      data={days}
      numColumns={7}
      scrollEnabled={false}
      renderItem={(day) => (
        <Pressable
          className={`h-[3rem] w-[14.4%] border-b border-r border-gray-300 ${
            day.item.isToday ? "bg-green-200" : ""
          } ${day.item.isThisMonth ? "" : "bg-gray-400"} ${
            day.item.isSelectedDate ? "bg-yellow-200" : ""
          }`}
          onPress={() => {
            changeHandler(day.item.date);
          }}
        >
          <View className={"h-full w-full"}>
            <Text className={"text-gray-600"}>{day.item.date.toISOString().slice(8, 10)}</Text>
            <Text className={"text-right text-xs text-green-500"}>
              {!day.item.totalDisabled && day.item.income.toLocaleString()}
            </Text>
            <Text className={"text-right text-xs text-red-500"}>
              {!day.item.totalDisabled && day.item.outcome.toLocaleString()}
            </Text>
          </View>
        </Pressable>
      )}
    />
  </View>
);
