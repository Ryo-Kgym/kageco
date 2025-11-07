import { useDeleteDashboardSettingMutation } from "@v3/graphql/household";

export const useDeleteDashboardSetting = () => {
  const [{ error }, deleteDashboardSettingMutation] = useDeleteDashboardSettingMutation();

  const deleteDashboardSetting = async (settingId: string) => {
    try {
      await deleteDashboardSettingMutation({
        settingId,
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    deleteDashboardSetting,
  };
};
