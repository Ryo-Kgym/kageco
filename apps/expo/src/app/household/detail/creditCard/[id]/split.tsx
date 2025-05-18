import { Stack, useGlobalSearchParams } from "expo-router";
import { View } from "react-native";

import { SplitCreditCardDetail } from "~/feature/household/creditCardDetail";

const Page = () => {
  const { id } = useGlobalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className={"w-full p-5"}>
        <SplitCreditCardDetail id={id as string} />
      </View>
    </View>
  );
};

export default Page;
