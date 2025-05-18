import { Stack } from "expo-router";
import { View } from "react-native";

import { RegisterSwitcher } from "~/feature/household/register";

const Page = () => (
  <View>
    <Stack.Screen options={{ headerShown: false }} />
    <View className={"w-full p-5"}>
      <RegisterSwitcher />
    </View>
  </View>
);

export default Page;
