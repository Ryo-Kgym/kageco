/**
 * 日本時間のHH:mm:ss形式に変換する
 */
export const convertToHms = (date: Date | undefined, alternativeValue = "") => {
  if (date === undefined) {
    return alternativeValue;
  }

  // 日本時間に変換（UTCからの時差は+9時間）
  const jpDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const hh = jpDate.getUTCHours().toString().padStart(2, "0");
  const mm = jpDate.getUTCMinutes().toString().padStart(2, "0");
  const ss = jpDate.getUTCSeconds().toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};
