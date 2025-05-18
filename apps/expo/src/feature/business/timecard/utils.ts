/**
 * 勤怠管理に関するユーティリティ関数
 */

/**
 * 秒数を時間:分:秒形式に変換する
 * @param date 日付オブジェクト
 * @param defaultValue デフォルト値（日付がnullの場合に返す値）
 * @returns 時間:分:秒形式の文字列
 */
export const formatTime = (
  date: string | null | undefined,
  defaultValue = "-",
): string => {
  if (!date) return defaultValue;

  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * 秒数を時間:分形式に変換する
 * @param seconds 秒数
 * @param defaultValue デフォルト値（秒数が0以下の場合に返す値）
 * @returns 時間:分形式の文字列
 */
export const formatSeconds = (seconds: number, defaultValue = "-"): string => {
  if (seconds <= 0) return defaultValue;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

/**
 * 秒数を分に変換する
 * @param seconds 秒数
 * @param defaultValue デフォルト値（秒数が0以下の場合に返す値）
 * @returns 分の文字列
 */
export const formatMinutes = (
  seconds: number | undefined,
  defaultValue = "-",
): string => {
  if (!seconds || seconds <= 0) return defaultValue;

  const minutes = Math.floor(seconds / 60);

  return `${minutes}`;
};
