import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

import { paths } from "~/app/paths";
import { DashboardFrame } from "~/feature/household/dashboard/DashboardFrame";

export const RegisterBox = () => {
  return (
    <DashboardFrame
      label={""}
      href={paths.household.registerDaily}
      size={"25%"}
    >
      <View className={"items-center justify-center"}>
        <AntDesign name="edit" size={48} color="gray" />
      </View>
    </DashboardFrame>
  );
};
