import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

import { AddButton, Modal, UpdateButton } from "~/ui";
import { useGetDashboardBoxes } from "../../dashboard/useGetDashboardBoxes";
import { EditDashboardSetting } from "../edit/EditDashboardSetting";
import { featureMap } from "../list/feature-map";
import { RegisterDashboardSetting } from "../register/RegisterDashboardSetting";
import type { SettingProps } from "../type";
import { useUpdateDashboardSettingOrder } from "./useUpdateDashboardSettingOrder";

export const DashboardSettingList = () => {
  const { getSettings } = useGetDashboardBoxes();
  const [data, setData] = useState<SettingProps[]>(getSettings());
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [settingId, setSettingId] = useState<string | null>(null);
  const setting = getSettings().find((s) => s.id === settingId);
  const { updateOrder } = useUpdateDashboardSettingOrder();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setData(getSettings());
  }, [visible, addVisible]);

  const updateOrderHandler = async () => {
    try {
      await updateOrder(
        data.map((d) => ({
          settingId: d.id,
        })),
      );
      alert("更新しました");
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<SettingProps>) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => {
          setSettingId(item.id);
          setVisible(true);
        }}
        disabled={isActive}
        style={[{ backgroundColor: isActive ? "rgba(255,0,0,0.1)" : "clear" }]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 8,
            borderStyle: "solid",
            borderBottomWidth: 0.5,
            borderColor: "gray",
          }}
        >
          <Text
            style={{
              width: 20,
              textAlign: "right",
            }}
          >
            {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
            {getIndex() ? getIndex()! + 1 : 1}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text className={"text-xl"}>{featureMap[item.feature].label}</Text>
            <View
              style={{
                flex: 1,
                paddingRight: 20,
              }}
            >
              {item.argsMap.map((at) => (
                <Text
                  key={at.type}
                  style={{
                    textAlign: "right",
                  }}
                >
                  {`${at.type}= ${at.value.toString()}`}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Modal visible={visible} setVisible={setVisible}>
        <EditDashboardSetting
          setting={setting}
          updateAfterHandler={() => {
            setVisible(false);
          }}
        />
      </Modal>
      <Modal visible={addVisible} setVisible={setAddVisible}>
        <RegisterDashboardSetting
          registerAfterHandler={() => {
            setAddVisible(false);
          }}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <AddButton addHandler={() => setAddVisible(true)} />
        </View>
        <View style={{ width: "50%" }}>
          <UpdateButton updateHandler={updateOrderHandler} />
        </View>
      </View>
    </>
  );
};
