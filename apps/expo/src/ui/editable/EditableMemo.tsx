import { TextInput } from "react-native";

import { FiledFrame } from "~/ui/FiledFrame";
import type { EditableProps } from "~/ui/editable/editable-props";

export const EditableMemo = ({
  value,
  setValue,
  disabled = false,
  defaultValue,
}: EditableProps<string | null>) => {
  return (
    <FiledFrame>
      <TextInput
        className={"text-xl"}
        numberOfLines={4}
        multiline={true}
        onChangeText={setValue}
        editable={!disabled}
        inputMode={"text"}
        placeholder={defaultValue ?? undefined}
      >
        {value}
      </TextInput>
    </FiledFrame>
  );
};
