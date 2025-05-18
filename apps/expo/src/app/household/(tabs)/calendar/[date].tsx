import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Calendar } from "src/feature/household/calendar";

const Page = () => {
  const { date } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <Calendar baseDate={new Date(date as string)} />
    </View>
  );
};

export default Page;
