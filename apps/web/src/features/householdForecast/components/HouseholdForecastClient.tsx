import type { FC } from "react";
import styles from "./HouseholdForecastClient.module.scss";

type MonthData = {
  income: number;
  expense: number;
  balance: number;
};

type ForecastData = {
  currentMonth: MonthData;
  nextMonth: MonthData;
  nextThreeMonths: MonthData;
  nextSixMonths: MonthData;
};

type Props = {
  forecastData: ForecastData;
};

export const HouseholdForecastClient: FC<Props> = ({ forecastData }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>収支予測</h1>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>今月</h2>
          <div className={styles.cardContent}>
            <div className={styles.row}>
              <span className={styles.label}>収入:</span>
              <span className={styles.income}>
                {formatCurrency(forecastData.currentMonth.income)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>支出:</span>
              <span className={styles.expense}>
                {formatCurrency(forecastData.currentMonth.expense)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>収支:</span>
              <span
                className={
                  forecastData.currentMonth.balance >= 0
                    ? styles.positive
                    : styles.negative
                }
              >
                {formatCurrency(forecastData.currentMonth.balance)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>来月</h2>
          <div className={styles.cardContent}>
            <div className={styles.row}>
              <span className={styles.label}>収入:</span>
              <span className={styles.income}>
                {formatCurrency(forecastData.nextMonth.income)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>支出:</span>
              <span className={styles.expense}>
                {formatCurrency(forecastData.nextMonth.expense)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>収支:</span>
              <span
                className={
                  forecastData.nextMonth.balance >= 0
                    ? styles.positive
                    : styles.negative
                }
              >
                {formatCurrency(forecastData.nextMonth.balance)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>3ヶ月予測</h2>
          <div className={styles.cardContent}>
            <div className={styles.row}>
              <span className={styles.label}>収入:</span>
              <span className={styles.income}>
                {formatCurrency(forecastData.nextThreeMonths.income)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>支出:</span>
              <span className={styles.expense}>
                {formatCurrency(forecastData.nextThreeMonths.expense)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>収支:</span>
              <span
                className={
                  forecastData.nextThreeMonths.balance >= 0
                    ? styles.positive
                    : styles.negative
                }
              >
                {formatCurrency(forecastData.nextThreeMonths.balance)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>6ヶ月予測</h2>
          <div className={styles.cardContent}>
            <div className={styles.row}>
              <span className={styles.label}>収入:</span>
              <span className={styles.income}>
                {formatCurrency(forecastData.nextSixMonths.income)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>支出:</span>
              <span className={styles.expense}>
                {formatCurrency(forecastData.nextSixMonths.expense)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>収支:</span>
              <span
                className={
                  forecastData.nextSixMonths.balance >= 0
                    ? styles.positive
                    : styles.negative
                }
              >
                {formatCurrency(forecastData.nextSixMonths.balance)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
