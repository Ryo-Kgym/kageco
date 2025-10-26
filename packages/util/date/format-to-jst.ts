type Style = "YYYY-MM-DD HH:mm:ss";

/**
 * Date を日本時間(JST, UTC+9)に変換し、指定スタイルでフォーマットする
 * 現在サポートするスタイルは 'YYYY-MM-DD HH:mm:ss' のみ。
 * Expo/React Native 環境でも動作するよう、Intl や外部ライブラリは使用しない。
 */
export const formatToJst = (
  date: Date,
  style: Style = "YYYY-MM-DD HH:mm:ss",
): Style => {
  // JST は UTC+9。基準となる UTC 時間に 9 時間を加算し、UTC 系 getter で取得する。
  const jpDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = jpDate.getUTCFullYear();
  const mm = String(jpDate.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(jpDate.getUTCDate()).padStart(2, "0");
  const HH = String(jpDate.getUTCHours()).padStart(2, "0");
  const MM = String(jpDate.getUTCMinutes()).padStart(2, "0");
  const SS = String(jpDate.getUTCSeconds()).padStart(2, "0");

  // いまのところ style は 1 種類のみ
  if (style === "YYYY-MM-DD HH:mm:ss") {
    return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}` as Style;
  }

  // 将来的に増えた場合の安全策（ここに到達しない想定）
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}` as Style;
};
