import { FlatList, Pressable, Text, View } from "react-native";

export const BalanceListPresenter = ({
  accounts,
}: {
  accounts: {
    id: string;
    name: string;
    balance: number;
    redirectHandler: () => void;
  }[];
}) => (
  <FlatList
    data={accounts}
    keyExtractor={(account) => account.id}
    renderItem={({ item: { name, balance, redirectHandler } }) => (
      <Pressable onPress={redirectHandler}>
        <View className="flex-row border-b border-b-gray-300 px-4 py-3 text-black">
          <Text className="w-2/3 text-xl">{name}</Text>
          <Text className="w-1/3 text-right text-xl">
            {`${balance.toLocaleString()} 円`}
          </Text>
        </View>
      </Pressable>
    )}
  />
);
