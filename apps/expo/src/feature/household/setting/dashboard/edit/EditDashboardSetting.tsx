import { useEffect, useState } from "react";
import { View } from "react-native";

import { DeleteButton, ResetButton, UpdateButton } from "~/ui";
import { featureMap } from "../list/feature-map";
import type { ArgsMapType, Feature } from "../type";
import { ArgsMapTypesPicker, EditableFeature } from "../ui";
import { useDeleteDashboardSetting } from "./useDeleteDashboardSetting";
import { useEditDashboardSetting } from "./useEditDashboardSetting";

export const EditDashboardSetting = ({
  setting,
  updateAfterHandler,
}: {
  setting:
    | {
        id: string;
        feature: Feature;
        order: number;
        argsMap: ArgsMapType[];
      }
    | undefined;
  updateAfterHandler?: () => void;
}) => {
  const [feature, setFeature] = useState<Feature | null>(null);
  const [argsMapTypes, setArgsMapTypes] = useState<ArgsMapType[]>([]);
  const { updateSetting } = useEditDashboardSetting();
  const { deleteDashboardSetting } = useDeleteDashboardSetting();

  const updateHandler = async () => {
    if (!setting || !feature) {
      return;
    }
    try {
      await updateSetting({
        settingId: setting.id,
        feature,
        order: setting.order,
        argsMapTypes,
      });
      alert("更新しました");
      setArgsMapTypes(argsMapTypes);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    } finally {
      updateAfterHandler?.();
    }
  };

  const deleteHandler = async () => {
    if (!setting) {
      return;
    }
    try {
      await deleteDashboardSetting(setting.id);
      alert("削除しました");
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    } finally {
      updateAfterHandler?.();
    }
  };

  const resetHandler = () => {
    if (setting) {
      setFeature(setting.feature);
      setArgsMapTypes(setting.argsMap);
    }
  };

  useEffect(() => {
    if (setting) {
      setFeature(setting.feature);
      setArgsMapTypes(setting.argsMap);
    }
  }, [setting]);

  if (!setting || !feature) return null;

  return (
    <View>
      <EditableFeature value={feature} setValue={setFeature} disabled={true} />
      <View>
        {featureMap[feature].argsTypes.map((type, index) => (
          <ArgsMapTypesPicker
            key={type}
            type={type}
            index={index}
            argsMapTypes={argsMapTypes}
            setArgsMapTypes={setArgsMapTypes}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            width: "33%",
          }}
        >
          <UpdateButton updateHandler={updateHandler} />
        </View>
        <View
          style={{
            width: "33%",
          }}
        >
          <DeleteButton deleteHandler={deleteHandler} />
        </View>
        <View
          style={{
            width: "33%",
          }}
        >
          <ResetButton resetHandler={resetHandler} />
        </View>
      </View>
    </View>
  );
};
