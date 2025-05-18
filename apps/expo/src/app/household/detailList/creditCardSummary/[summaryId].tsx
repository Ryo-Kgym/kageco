import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { DetailListByCreditCardSummary } from "~/feature/household/detailList";
import { useGetCreditCardSummaryById } from "~/hooks/household/credit_card/useGetCreditCardSummaryById";

const Page = () => {
  const { summaryId } = useLocalSearchParams();
  const { creditCardSummary } = useGetCreditCardSummaryById({
    summaryId: summaryId as string,
  });

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${creditCardSummary.genre.name}の引き落とし`,
        }}
      />
      <View className={"w-full"}>
        <DetailListByCreditCardSummary summaryId={summaryId as string} />
      </View>
    </View>
  );
};

export default Page;
