import type { FC } from "react";

import type { CheckboxProps } from "../props";

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  nowrap,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        className="cursor-pointer"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        className={`cursor-pointer ${nowrap ? "whitespace-nowrap" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
