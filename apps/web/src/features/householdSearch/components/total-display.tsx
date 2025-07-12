import { Group, Stack, Text } from "@mantine/core";
import type { FC } from "react";
import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import styles from "./total-display.module.scss";

type TotalDisplayProps = {
  income: number;
  outcome: number;
};

/**
 * 合計表示コンポーネント
 */
export const TotalDisplay: FC<TotalDisplayProps> = ({ income, outcome }) => {
  const total = income - outcome;

  return (
    <Stack className={styles.stack}>
      <Group className={styles.group}>
        <Text className={styles.text}>収入:</Text>
        <FormatPrice iocomeType={IocomeType.Income} price={income} />
      </Group>
      <Group className={styles.group}>
        <Text className={styles.text}>支出:</Text>
        <FormatPrice iocomeType={IocomeType.Outcome} price={outcome} />
      </Group>
      <Group className={styles.group}>
        <Text className={`${styles.text} ${styles.bold}`}>合計:</Text>
        <Text
          className={`${styles.text} ${styles.bold} ${total >= 0 ? styles.green : styles.red}`}
        >
          {total.toLocaleString()}円
        </Text>
      </Group>
    </Stack>
  );
};
