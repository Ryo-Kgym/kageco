import {
  useInsertDashboardSettingArgsMutation,
  useInsertDashboardSettingMutation,
} from "@v3/graphql/household";

import type { ArgsMapType, Feature } from "~/feature/household/setting/dashboard/type";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { useGenerateId } from "~/hooks/id/useGenerateId";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";

export const useRegisterDashboardSetting = () => {
  const [insertSettingResult, insertSetting] = useInsertDashboardSettingMutation();
  const [insertSettingArgsResult, insertSettingArgs] = useInsertDashboardSettingArgsMutation();
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();
  const { generateId } = useGenerateId();

  const registerDashboardSetting = async ({
    feature,
    argsMapTypes,
  }: {
    feature: Feature;
    argsMapTypes: ArgsMapType[];
  }) => {
    const settingId = generateId();
    try {
      await insertSetting({
        settingId,
        feature,
        order: 99,
        userId,
        groupId,
      });
      if (insertSettingResult.error) {
        throw insertSettingResult.error;
      }

      await Promise.all(
        argsMapTypes
          // 引数を持たないfeatureは除外する
          .filter((argsMapType) => Object.hasOwn(argsMapType, "type"))
          .map(async (argsMapType) => {
            await insertSettingArgs({
              id: generateId(),
              type: argsMapType.type,
              value: argsMapType.value.toString(),
              settingId,
            });
          }),
      );
      if (insertSettingArgsResult.error) {
        throw insertSettingArgsResult.error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    registerDashboardSetting,
  };
};
