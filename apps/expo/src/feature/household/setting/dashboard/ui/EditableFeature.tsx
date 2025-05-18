import { featureMap } from "~/feature/household/setting/dashboard/list/feature-map";
import type { Feature } from "~/feature/household/setting/dashboard/type";
import { Picker } from "~/ui/Picker";
import type { EditableProps } from "~/ui/editable/editable-props";

const featureOptions = Object.keys(featureMap).map((f) => ({
  label: featureMap[f as Feature].label,
  value: f as Feature,
}));

export const EditableFeature = ({
  value,
  setValue,
  disabled,
}: EditableProps<Feature>) => (
  <Picker
    value={value}
    setValue={setValue}
    data={featureOptions}
    disabled={disabled}
  />
);
