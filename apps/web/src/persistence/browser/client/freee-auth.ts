import { getCookieValue, saveCookie } from "./cookie";

/**
 * freeeの認証状態を確認する
 * @returns ユーザーがfreeeで認証されているかどうか
 */
export const isFreeeAuthenticated = (): boolean => {
  try {
    const accessToken = getCookieValue<string>("freeeAccessToken", false);
    const expiresAt = getCookieValue<string>("freeeTokenExpiresAt", false);
    return !!(accessToken && expiresAt && Number(expiresAt) > Date.now());
  } catch (error) {
    console.error("Error checking freee auth:", error);
    return false;
  }
};

/**
 * freee認証に関連する3つのクッキーを一度に設定する
 * @param accessToken - freeeアクセストークン
 * @param refreshToken - freeeリフレッシュトークン
 * @param expiresIn - トークンの有効期限（秒）
 */
export const saveFreeeAuth = ({
  accessToken,
  refreshToken,
  expiresIn,
}: {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}) => {
  saveCookie({ key: "freeeAccessToken", value: accessToken });
  saveCookie({ key: "freeeRefreshToken", value: refreshToken });

  // expiresInが指定されている場合は、有効期限を計算して保存
  // 指定されていない場合は、空文字列を保存（ログアウト時など）
  const expiresAtValue = expiresIn ? String(Date.now() + expiresIn * 1000) : "";

  saveCookie({ key: "freeeTokenExpiresAt", value: expiresAtValue });
};

export const clearFreeeAuth = () => {
  saveCookie({ key: "freeeAccessToken", value: "" });
  saveCookie({ key: "freeeRefreshToken", value: "" });
  saveCookie({ key: "freeeTokenExpiresAt", value: "" });
};
