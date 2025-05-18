import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const MonthChanger = ({
  baseDate,
  changeHandler,
}: {
  baseDate: Date;
  changeHandler: (date: Date) => void;
}) => {
  const changeBaseDate = (date: Date, addMonth?: number) => {
    const addedDate = new Date(
      date.setMonth(date.getMonth() + (addMonth ?? 0)),
    );
    changeHandler(addedDate);
  };

  return (
    <View className={"flex flex-row items-center justify-between px-10"}>
      <AntDesign
        name="banckward"
        size={24}
        color="black"
        onPress={() => changeBaseDate(baseDate, -1)}
      />
      <Text className={"text-2xl"}>{baseDate.toISOString().slice(0, 10)}</Text>
      <AntDesign
        name="forward"
        size={24}
        color="black"
        onPress={() => changeBaseDate(baseDate, 1)}
      />
    </View>
  );
};
