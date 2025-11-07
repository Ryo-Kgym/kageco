import type { ComponentProps } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { AddFavoriteFilterArg } from "~/feature/household/setting/favoriteFilter/argAdd/AddFavoriteFilterArg";
import { useDeleteFavoriteFilterArg } from "~/feature/household/setting/favoriteFilter/argDelete/useDeleteFavoriteFilterArg";
import { EditFavoriteFilterArg } from "~/feature/household/setting/favoriteFilter/argEdit/EditFavoriteFilterArg";
import { Modal, RegisterButton } from "~/ui";
import { useGetFavoriteFilter } from "./useGetFavoriteFilter";

export const FavoriteFilterDetail = ({ filterId }: { filterId: string }) => {
  const { getFavoriteFilterArgs } = useGetFavoriteFilter(filterId);
  const { deleteFavoriteFilterArg } = useDeleteFavoriteFilterArg();

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editArg, setEditArg] = useState<ComponentProps<typeof EditFavoriteFilterArg>["arg"]>({
    id: "",
    key: "categoryId",
    value: "",
    option: undefined,
  });

  const deleteHandler = async (id: string) => {
    try {
      await deleteFavoriteFilterArg({ id });
      alert("削除しました");
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  return (
    <View>
      <SwipeListView
        data={getFavoriteFilterArgs()}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable
            style={{
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              borderColor: "gray",
              paddingTop: 10,
              paddingBottom: 8,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
            }}
            onLongPress={() => {
              setEditArg({
                id: item.id,
                key: item.key,
                value: item.value,
                option: item.category,
              });
              setEditVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text className={"text-xl text-gray-500"}>{item.key}</Text>
              <Text className={"text-md text-right"}>{item.label}</Text>
            </View>
          </Pressable>
        )}
        renderHiddenItem={(data) => (
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            onPress={() => deleteHandler(data.item.id)}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "red",
                width: 75,
                paddingTop: 10,
                paddingBottom: 8,
              }}
            >
              <Text className={"text-center text-xl text-white"}>削除</Text>
            </View>
          </Pressable>
        )}
        rightOpenValue={-75}
      />
      <RegisterButton registerHandler={() => setAddVisible(true)} />
      <Modal visible={addVisible} setVisible={setAddVisible}>
        <AddFavoriteFilterArg filterId={filterId} />
      </Modal>
      <Modal visible={editVisible} setVisible={setEditVisible}>
        <EditFavoriteFilterArg arg={editArg} />
      </Modal>
    </View>
  );
};
