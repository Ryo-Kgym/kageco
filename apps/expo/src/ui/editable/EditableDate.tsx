import { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import type { EditableProps } from "~/ui/editable/editable-props";

export const EditableDate = ({
  value,
  setValue,
  loadingValue,
  disabled,
}: EditableProps<Date | undefined> & { loadingValue: string }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const title = value ? value.toISOString().slice(0, 10) : loadingValue;
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setValue(date);
    hideDatePicker();
  };

  return (
    <View className={"rounded bg-gray-200"}>
      <Button title={title} onPress={showDatePicker} color={"#444444"} disabled={disabled} />
      <DateTimePickerModal
        date={value}
        textColor={"#000"}
        locale="ja"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
