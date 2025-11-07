import { Button } from "react-native";

export const ButtonDelete = ({
  deleteHandler,
  disabled = false,
}: {
  deleteHandler: () => void;
  disabled?: boolean;
}) => <Button title={"削除"} onPress={deleteHandler} disabled={disabled} color={"#FF0000"} />;
