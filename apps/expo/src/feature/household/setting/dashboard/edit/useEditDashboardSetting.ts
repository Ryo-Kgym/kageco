import {
  useDeleteInsertDashboardSettingArgsMutation,
  useUpdateDashboardSettingMutation,
} from "@v3/graphql/household";

import type { ArgsMapType, Feature } from "~/feature/household/setting/dashboard/type";
import { useGenerateId } from "~/hooks/id/useGenerateId";

export const useEditDashboardSetting = () => {
  const [, updateSettingMutation] = useUpdateDashboardSettingMutation();
  const [, dIArgsMutation] = useDeleteInsertDashboardSettingArgsMutation();
  const { generateId } = useGenerateId();

  const updateSetting = async ({
    settingId,
    feature,
    order,
    argsMapTypes,
  }: {
    settingId: string;
    feature: Feature;
    order: number;
    argsMapTypes: ArgsMapType[];
  }) => {
    try {
      const { error: settingError } = await updateSettingMutation({
        settingId,
        feature: feature as string,
        order,
      });

      if (settingError) {
        throw settingError;
      }

      await dIArgsMutation({
        objects: argsMapTypes.map((amt) => ({
          id: generateId(),
          settingId,
          type: amt.type,
          value: amt.value.toString(),
        })),
        settingId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { updateSetting };
};
