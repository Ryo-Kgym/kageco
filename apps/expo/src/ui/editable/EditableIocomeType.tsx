import type { IocomeType } from "~/types/iocome-type";
import { getLabel, iocomeTypeArray } from "~/types/iocome-type";
import type { EditableProps } from "~/ui/editable/editable-props";
import { SegmentedControl } from "../SegmentedControl";

export const EditableIocomeType = ({
  value,
  setValue,
  disabled = false,
}: EditableProps<IocomeType>) => {
  const data = iocomeTypeArray.map((value) => ({
    value,
    label: getLabel(value),
  }));

  return (
    <SegmentedControl
      value={value}
      setValue={setValue}
      data={data}
      disabled={disabled}
    />
  );
};
