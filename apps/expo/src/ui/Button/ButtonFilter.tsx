import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export const ButtonFilter = ({
  pressHandler,
}: {
  pressHandler: () => void;
}) => (
  <Pressable
    onPress={pressHandler}
    style={{
      zIndex: 100,
      position: "absolute",
      bottom: 10,
      right: 50,
    }}
  >
    <View
      style={{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 30,
        backgroundColor: "white",
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Feather name="filter" size={24} color="black" />
    </View>
  </Pressable>
);
