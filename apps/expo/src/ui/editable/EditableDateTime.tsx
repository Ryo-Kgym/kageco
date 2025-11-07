import { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { formatToJst } from "@/util/date/format-to-jst";
import type { EditableProps } from "~/ui/editable/editable-props";

/**
 * 日付と時刻を編集可能なボタン＋モーダルピッカー
 *
 * - ボタンを押すと日時ピッカーを表示します。
 * - 選択後、setValue に Date を返します。
 * - 表示タイトルは YYYY-MM-DD HH:mm 形式（値未設定時は loadingValue を表示）
 */
export const EditableDateTime = ({
  value,
  setValue,
  loadingValue,
  disabled,
}: EditableProps<Date | undefined> & { loadingValue: string }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const formatTitle = (d?: Date) => {
    if (!d) {
      return loadingValue;
    }
    return formatToJst(d);
  };

  const show = () => setPickerVisible(true);
  const hide = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    setValue(date);
    hide();
  };

  return (
    <View className={"rounded bg-gray-200"}>
      <Button title={formatTitle(value)} onPress={show} color={"#444444"} disabled={disabled} />
      <DateTimePickerModal
        date={value}
        textColor={"#000"}
        locale="ja"
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hide}
      />
    </View>
  );
};
