import type { FC, PropsWithChildren } from "react";

import styles from "./ItemCard.module.scss";

/**
 * @package
 */
export const ItemCard: FC<PropsWithChildren<{ itemName: string }>> = ({ itemName, children }) => {
  return (
    <div className={styles.module}>
      <div>{itemName}</div>
      {children}
    </div>
  );
};
