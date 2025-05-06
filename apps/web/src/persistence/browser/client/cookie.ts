import cookie from "js-cookie";

export const saveCookie = ({ key, value }: { key: string; value: string }) => {
  cookie.set(key, value);
};

/**
 * クッキーから値を取得する
 * @param key - クッキーのキー
 * @param parse - 値をJSONとしてパースするかどうか。デフォルトはtrue。Tがstring型の場合はfalseを指定することで、JSON.parseせずに文字列をそのまま返す。
 * @returns クッキーの値、またはnull
 */
export const getCookieValue = <T>(key: string, parse = true): T | null => {
  const stringValue = cookie.get(key);
  if (!stringValue) {
    return null;
  }

  // parseがfalseの場合（主にTがstring型の場合）は、JSON.parseせずにそのまま返す
  if (!parse) {
    return stringValue as unknown as T;
  }

  return JSON.parse(stringValue) as T;
};
