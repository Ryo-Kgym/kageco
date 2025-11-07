import { NumberInputContainer } from "../v5/NumberInputContainer";

type AmountInputPresenterProps = {
  value: number;
  onChange: (_: number) => void;
  disabled?: boolean;
};

export const AmountInput = ({ value, onChange, disabled = false }: AmountInputPresenterProps) => (
  <NumberInputContainer
    label={""}
    value={value}
    onChange={onChange}
    placeholder="0 - 999,999,999"
    withAsterisk={true}
    disabled={disabled}
  />
);
