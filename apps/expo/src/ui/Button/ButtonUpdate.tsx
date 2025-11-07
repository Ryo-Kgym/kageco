import { Button } from "react-native";

export const ButtonUpdate = ({
  updateHandler,
  disabled = false,
}: {
  updateHandler: () => void;
  disabled?: boolean;
}) => <Button title={"更新"} onPress={updateHandler} disabled={disabled} color={"#0000FF"} />;
