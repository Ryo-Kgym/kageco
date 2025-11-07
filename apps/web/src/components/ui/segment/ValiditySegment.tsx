import { Segment } from "./Segment";

type Props = {
  isValid: boolean;
  onChange: (_: boolean) => void;
  disabled?: boolean;
};
export const ValiditySegment = ({ isValid, onChange, disabled = false }: Props) => {
  return (
    <Segment
      value={String(isValid)}
      onChange={(value) => onChange(value === "true")}
      data={data}
      disabled={disabled}
    />
  );
};

const data = [
  { value: "true", label: "有効" },
  { value: "false", label: "無効" },
];
