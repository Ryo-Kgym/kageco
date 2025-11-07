import { Button } from "react-native";

export const ButtonReset = ({
  resetHandler,
  disabled = false,
}: {
  resetHandler: () => void;
  disabled?: boolean;
}) => <Button title={"リセット"} onPress={resetHandler} disabled={disabled} color={"#000000"} />;
