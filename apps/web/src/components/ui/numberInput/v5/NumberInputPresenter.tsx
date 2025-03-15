import { NumberInput } from "@mantine/core";

/**
 * @package
 */
export const NumberInputPresenter = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  withAsterisk,
  disabled,
}: {
  label: string;
  value: number | "";
  onChange: (_: string | number) => void;
  placeholder?: string;
  error: string;
  withAsterisk?: boolean;
  disabled: boolean;
}) => (
  <>
    <NumberInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      error={error}
      size="xs"
      withAsterisk={withAsterisk}
      hideControls
      disabled={disabled}
      type="tel"
    />
  </>
);
