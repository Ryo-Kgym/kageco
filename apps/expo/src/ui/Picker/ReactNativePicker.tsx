import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Text } from "react-native";

import { Modal } from "../Modal";
import type { PickerProps } from "./props";

export const ReactNativePicker = <T,>({
  title,
  value,
  setValue,
  data,
  disabled = false,
  description,
}: PickerProps<T>) => {
  const [open, setOpen] = useState(false);
  const label = data.filter((d) => d.value === value)[0]?.label ?? "未選択";

  return (
    <>
      <Button title={label} onPress={() => setOpen(true)} disabled={disabled} />
      <Modal title={title} visible={open} setVisible={setOpen}>
        <Picker
          selectedValue={value ?? data[0]?.value}
          onValueChange={setValue}
          itemStyle={{ height: 250, fontSize: 18, color: "black" }}
        >
          {data
            .filter(
              (d) =>
                // disabledがfalseの場合は、全て表示する
                !disabled ||
                // disableの場合は、valueが一致するものだけ表示する
                (disabled && d.value === value),
            )
            .map((d) => (
              <Picker.Item key={String(d.value)} label={d.label} value={d.value} />
            ))}
        </Picker>
        {typeof description === "string" ? <Text>{description}</Text> : description}
      </Modal>
    </>
  );
};
