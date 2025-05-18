import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { EditDaily } from "~/feature/household/daily";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "" }} />
      <View className={"w-full p-5"}>
        <EditDaily id={id as string} />
      </View>
    </View>
  );
};

export default Page;
