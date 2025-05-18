import { FlatList, Pressable, Text, View } from "react-native";

import { Amount } from "~/ui/Amount";
import type { Detail } from "~/ui/Details/detail-type";
import { getBgColor } from "~/ui/Details/get-bg-color";

export const Details = ({ details }: { details: Detail[] }) => (
  <FlatList
    data={details}
    keyExtractor={(item) => item.id}
    renderItem={({ item: detail }) => (
      <Pressable onPress={detail.redirectHandler}>
        <View
          className={`flex-row items-center border-b border-b-gray-400 px-3 py-2 ${getBgColor(
            detail.type,
          )}`}
        >
          <View className={"w-2/3"}>
            <View className={"flex-row items-center gap-5"}>
              {detail.date && (
                <Text className={"text-lg text-gray-600"}>
                  {detail.date.toISOString().slice(0, 10)}
                </Text>
              )}
              <Text className={"text-lg"}>{detail.categoryName}</Text>
            </View>
            <View className={"flex-row items-center gap-2"}>
              <Text className={"text-gray-600"}>{detail.genreName}</Text>
              {detail.accountName && (
                <Text className={"text-gray-600"}>{detail.accountName}</Text>
              )}
              <Text className={"text-gray-600"}>
                {detail.memo ? `${detail.memo.substring(0, 10)}...` : null}
              </Text>
            </View>
          </View>
          <View className={"w-1/3"}>
            <Amount iocomeType={detail.iocomeType} amount={detail.amount} />
          </View>
        </View>
      </Pressable>
    )}
  />
);
