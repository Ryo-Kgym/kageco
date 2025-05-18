import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { YearlyCategoryRankList } from "~/feature/household/rank";

const Page = () => {
  // yyyy-MM-dd 形式で受け取る
  const { date: yyyy_MM_dd } = useLocalSearchParams();
  // yyyy 形式に変換する
  const yyyy = new Date(yyyy_MM_dd as string).toISOString().slice(0, 4);
  return (
    <View>
      <Stack.Screen options={{ title: `${yyyy}年のランキング` }} />
      <View className={"w-full"}>
        <YearlyCategoryRankList year={new Date(yyyy_MM_dd as string)} />
      </View>
    </View>
  );
};

export default Page;
