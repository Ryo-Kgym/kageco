import { Picker } from "~/ui/Picker";
import type { FavoriteFilterArgValueInputComponent } from "../FavoriteFilterArgValueInput";

export const YearInput: FavoriteFilterArgValueInputComponent = ({ value, setValue }) => (
  <Picker value={value} setValue={setValue} data={generateYearData()} />
);

const generateYearData = () => {
  const range = { min: -5, max: 0 };
  const now = new Date();
  const year = now.getFullYear();
  const min = year + range.min;
  const max = year + range.max;
  const years = [];
  for (let i = min; i <= max; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};
