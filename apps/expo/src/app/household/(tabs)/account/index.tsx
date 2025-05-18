import { Stack } from "expo-router";
import { View } from "react-native";

import { BalanceList } from "~/feature/household/balance";

const Page = () => (
  <View>
    <Stack.Screen options={{ headerShown: false }} />
    <BalanceList />
  </View>
);

export default Page;
