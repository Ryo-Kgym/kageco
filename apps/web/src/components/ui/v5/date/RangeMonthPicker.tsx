import { MonthPickerInput as MantineMonthPickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

type NullableDate = Date | null;

export const RangeMonthPicker = ({
  onChange,
  label,
  defaultValue = [null, null],
}: {
  onChange: (value: [NullableDate, NullableDate]) => Promise<void>;
  label?: string;
  defaultValue?: [NullableDate, NullableDate];
}) => {
  const [value, setValue] = useState<[NullableDate, NullableDate]>(defaultValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const [fromFirstDayOfMonth, toFirstDayOfMonth] = value;

    const toLastDayOfMonth = toFirstDayOfMonth
      ? new Date(toFirstDayOfMonth.getFullYear(), toFirstDayOfMonth.getMonth() + 1, 0)
      : null;

    void onChange([fromFirstDayOfMonth, toLastDayOfMonth]);
  }, [value]);

  return (
    <MantineMonthPickerInput
      valueFormat="YYYY-MM"
      type="range"
      label={label}
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
      clearable
      numberOfColumns={2}
      monthsListFormat="MM"
      yearsListFormat="YY"
      columnsToScroll={1}
    />
  );
};
