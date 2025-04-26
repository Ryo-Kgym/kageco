"use server";

import { FreeeAuthUsecase } from "@/core/usecase/household/freee/freee-auth-usecase";

/**
 * 認証URLを取得する
 * @returns 認証URLとstate（CSRF対策用のランダムな文字列）
 */
export async function getAuthorizationUrl(): Promise<{
  url: string;
  state: string;
}> {
  try {
    // サーバーサイドでのみ利用可能な環境変数を使用
    const clientId = process.env.FREEE_CLIENT_ID;
    const clientSecret = process.env.FREEE_CLIENT_SECRET;
    const redirectUri = process.env.FREEE_CLIENT_REDIRECT_URI || "";

    if (!clientId || !clientSecret) {
      throw new Error("Freee client ID or client secret is not set");
    }

    // ユースケースを作成
    const freeeAuthUsecase = new FreeeAuthUsecase(clientId, clientSecret);

    // 認証URLを取得
    const result = await freeeAuthUsecase.handle({
      type: "getAuthUrl",
      redirectUri,
    });

    if (result.type === "authUrl") {
      return {
        url: result.url,
        state: result.state,
      };
    }

    throw new Error("Failed to get authorization URL");
  } catch (error) {
    console.error("Error getting authorization URL:", error);
    throw new Error("Failed to get authorization URL");
  }
}

/**
 * 認可コードからトークンを取得する
 * @param code 認可コード
 * @returns トークン情報、または取得できなかった場合はnull
 */
export async function getTokenWithCode(code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  companyId: string;
} | null> {
  try {
    const clientId = process.env.FREEE_CLIENT_ID;
    const clientSecret = process.env.FREEE_CLIENT_SECRET;
    const redirectUri = process.env.FREEE_CLIENT_REDIRECT_URI || "";

    if (!clientId || !clientSecret) {
      throw new Error("Freee client ID or client secret is not set");
    }

    // ユースケースを作成
    const freeeAuthUsecase = new FreeeAuthUsecase(clientId, clientSecret);

    const result = await freeeAuthUsecase.handle({
      type: "getToken",
      code,
      redirectUri,
    });

    if (result.type === "token") {
      // トークン情報をクライアントサイドに返す
      return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        companyId: result.companyId,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting token with code:", error);
    return null;
  }
}

/**
 * リフレッシュトークンを使用して新しいトークンを取得する
 * @param refreshToken リフレッシュトークン
 * @returns 新しいトークン情報、または取得できなかった場合はnull
 */
export async function refreshToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  companyId: string;
} | null> {
  try {
    const clientId = process.env.FREEE_CLIENT_ID;
    const clientSecret = process.env.FREEE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Freee client ID or client secret is not set");
      return null;
    }

    const freeeAuthUsecase = new FreeeAuthUsecase(clientId, clientSecret);

    const result = await freeeAuthUsecase.handle({
      type: "refreshToken",
      refreshToken,
    });

    if (result.type === "token") {
      // トークン情報をクライアントサイドに返す
      return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        companyId: result.companyId,
      };
    }

    return null;
  } catch (error) {
    console.error("Error refreshing freee token:", error);
    return null;
  }
}
