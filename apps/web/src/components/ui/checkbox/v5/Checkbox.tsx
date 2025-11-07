import type { FC } from "react";

import type { CheckboxProps } from "../props";
import styles from "./Checkbox.module.scss";

export const Checkbox: FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className={styles.module}>
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
