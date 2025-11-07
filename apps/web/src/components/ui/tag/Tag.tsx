import type { FC } from "react";

import styles from "./Tag.module.scss";

type Props = {
  label: string;
  colorCode: string;
};

export const Tag: FC<Props> = ({ label, colorCode }) => (
  <span data-testid={"tag"} className={styles.module} style={{ backgroundColor: colorCode }}>
    {label}
  </span>
);
