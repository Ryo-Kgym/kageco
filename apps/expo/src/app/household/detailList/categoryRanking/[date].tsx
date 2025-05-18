import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { CategoryRankingDetailList } from "~/feature/household/detailList";

const Page = () => {
  // yyyy-MM-dd 形式で受け取る
  const { date } = useLocalSearchParams();
  // yyyy-MM 形式に変換する
  const yyyyMM = new Date(date as string).toISOString().slice(0, 7);
  return (
    <View>
      <Stack.Screen options={{ title: yyyyMM }} />
      <View className={"w-full"}>
        <CategoryRankingDetailList yyyyMM={new Date(date as string)} />
      </View>
    </View>
  );
};

export default Page;
