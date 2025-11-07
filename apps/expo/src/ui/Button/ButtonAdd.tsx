import { Button } from "react-native";

export const ButtonAdd = ({
  addHandler,
  disabled = false,
}: {
  addHandler: () => void;
  disabled?: boolean;
}) => <Button title={"追加"} onPress={addHandler} disabled={disabled} color={"#17c117"} />;
