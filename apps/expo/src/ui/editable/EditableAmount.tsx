import { Text, TextInput } from "react-native";

import { FiledFrame } from "~/ui/FiledFrame";
import type { EditableProps } from "~/ui/editable/editable-props";

export const EditableAmount = ({
  value,
  setValue,
  disabled = false,
  defaultValue,
}: EditableProps<number | null>) => (
  <FiledFrame>
    {disabled ? (
      <Text className={"text-right text-xl text-gray-400"}>
        {value?.toLocaleString()}
      </Text>
    ) : (
      <TextInput
        className={"text-right text-xl"}
        onChange={(e) => {
          // 値が数値のみをsetValueに設定する
          const value = e.nativeEvent.text;
          const numberValue = Number(value);
          if (Number.isNaN(numberValue)) return;
          setValue(numberValue);
        }}
        editable={!disabled}
        inputMode={"numeric"}
        placeholder={defaultValue ? String(defaultValue) : ""}
        value={value ? String(value) : ""}
      />
    )}
  </FiledFrame>
);
