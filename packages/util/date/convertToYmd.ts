import type { YYYY_MM_DD } from "./date";

/**
 * 日本時間のYYYY-MM-DD形式に変換する
 */
export const convertToYmd = (date: Date): YYYY_MM_DD => {
  // 日本時間に変換（UTCからの時差は+9時間）
  const jpDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = jpDate.getUTCFullYear();
  const mm = (jpDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = jpDate.getUTCDate().toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd}` as YYYY_MM_DD;
};
