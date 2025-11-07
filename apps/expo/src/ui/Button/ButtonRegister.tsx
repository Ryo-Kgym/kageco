import { Button } from "react-native";

export const ButtonRegister = ({
  registerHandler,
  disabled = false,
}: {
  registerHandler: () => void;
  disabled?: boolean;
}) => <Button title={"登録"} onPress={registerHandler} disabled={disabled} color={"#17c117"} />;
