import { Picker } from "~/ui/Picker";
import type { EditableProps } from "./editable-props";

export const EditableYear = ({
  value,
  setValue,
  defaultValue = new Date().getFullYear(),
  range,
}: EditableProps<number> & { range?: { min: number; max: number } }) => {
  const { min, max } = range ?? { min: -10, max: 10 };

  const data: { label: string; value: number }[] = [
    ...Array.from({ length: max - min + 1 }, (_, i) => {
      const year = max - i + defaultValue;
      return { label: `${year}年`, value: year };
    }),
  ];

  return <Picker value={value} setValue={setValue} data={data} />;
};
