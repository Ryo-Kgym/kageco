import { useUpdateDashboardSettingOrderMutation } from "@v3/graphql/household";

export const useUpdateDashboardSettingOrder = () => {
  const [, updateDashboardSettingOrder] = useUpdateDashboardSettingOrderMutation();

  const updateOrder = async (data: { settingId: string }[]) => {
    try {
      await Promise.all(
        data.map(async ({ settingId }, order) => {
          await updateDashboardSettingOrder({
            settingId,
            order,
          });
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  return { updateOrder };
};
