import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { DetailListByFavoriteFilter } from "~/feature/household/detailList";

const Page = () => {
  const { filterId, name } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: (name as string) ?? "" }} />
      <View className={"w-full"}>
        <DetailListByFavoriteFilter filterId={filterId as string} />
      </View>
    </View>
  );
};

export default Page;
