import { YearPickerInput } from "@mantine/dates";

type YearPickerPresenterProps = {
  year: Date | null;
  setYear: (_: Date | null) => void;
};

export const YearPickerPresenter = ({ year, setYear }: YearPickerPresenterProps) => {
  return (
    <YearPickerInput
      label="YEAR"
      placeholder="yyyy"
      value={year}
      onChange={setYear}
      mx="auto"
      maw={400}
      clearable={false}
    />
  );
};
