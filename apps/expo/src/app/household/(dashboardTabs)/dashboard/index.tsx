import { Stack } from "expo-router";
import { View } from "react-native";

import { HouseholdDashboard } from "~/feature/household/dashboard";

const Page = () => (
  <View>
    <Stack.Screen options={{ headerShown: false }} />
    <HouseholdDashboard />
  </View>
);
export default Page;
