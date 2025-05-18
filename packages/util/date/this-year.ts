import type { YYYY_MM_DD } from "./date";

/**
 * 今年の最初の日付（1月1日）を取得する
 */
export const getThisYearFirstDate = (): YYYY_MM_DD => {
  const date = new Date();
  return `${date.getFullYear()}-01-01` as YYYY_MM_DD;
};

/**
 * 今年の最後の日付（12月31日）を取得する
 */
export const getThisYearLastDate = (): YYYY_MM_DD => {
  const date = new Date();
  return `${date.getFullYear()}-12-31` as YYYY_MM_DD;
};
