import type { YYYY_MM } from "./date";

export const convertToYyyyMm = (date: Date) => {
  // 日本時間に変換（UTCからの時差は+9時間）
  const jpDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = jpDate.getUTCFullYear();
  const mm = (jpDate.getUTCMonth() + 1).toString().padStart(2, "0");

  return `${yyyy}-${mm}` as YYYY_MM;
};
