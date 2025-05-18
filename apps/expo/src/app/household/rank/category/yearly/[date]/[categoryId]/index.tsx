import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { DetailListByCategory } from "~/feature/household/detailList";

const Page = () => {
  // yyyy-MM-dd 形式で受け取る
  const { date: yyyy_MM_dd, categoryId } = useLocalSearchParams();
  // yyyy 形式に変換する
  const yyyy = new Date(yyyy_MM_dd as string).toISOString().slice(0, 4);

  return (
    <View>
      <Stack.Screen options={{ title: `${yyyy}年-` }} />
      <View className={"w-full"}>
        <DetailListByCategory
          year={new Date(yyyy_MM_dd as string)}
          categoryId={categoryId as string}
        />
      </View>
    </View>
  );
};

export default Page;
