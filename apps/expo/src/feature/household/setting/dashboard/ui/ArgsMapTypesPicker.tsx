import { Text } from "react-native";

import type {
  ArgsMapType,
  ArgsType,
} from "~/feature/household/setting/dashboard/type";
import { Picker } from "~/ui/Picker";
import { usePickerSetting } from "./usePickerSetting";

export const ArgsMapTypesPicker = ({
  type,
  index,
  argsMapTypes,
  setArgsMapTypes,
}: {
  type: ArgsType;
  index: number;
  argsMapTypes: ArgsMapType[];
  setArgsMapTypes: (args: ArgsMapType[]) => void;
}) => {
  const { pickerSetting } = usePickerSetting();
  return (
    <>
      <Text>{type}</Text>
      <Picker
        key={type}
        value={argsMapTypes[index]?.value}
        setValue={(value) => {
          const newArgs = [...argsMapTypes];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          newArgs[index] = { type, value };
          setArgsMapTypes(newArgs);
        }}
        data={pickerSetting[type].data}
      />
    </>
  );
};
