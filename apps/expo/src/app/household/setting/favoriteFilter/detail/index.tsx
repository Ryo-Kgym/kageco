import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { FavoriteFilterDetail } from "~/feature/household/setting";

const Page = () => {
  const { id, name } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: name as string }} />
      <View className={"w-full"}>
        <FavoriteFilterDetail filterId={id as string} />
      </View>
    </View>
  );
};

export default Page;
