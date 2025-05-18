import { useGetAccountByIdQuery } from "@v3/graphql/household";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { DetailListByAccount } from "~/feature/household/detailList";

const Page = () => {
  const { accountId } = useLocalSearchParams();
  const [{ data }] = useGetAccountByIdQuery({
    variables: {
      accountId: accountId as string,
    },
  });
  return (
    <View>
      <Stack.Screen options={{ title: data?.account?.name ?? "" }} />
      <View className={"w-full"}>
        <DetailListByAccount accountId={accountId as string} />
      </View>
    </View>
  );
};

export default Page;
