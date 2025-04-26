"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getCookieValue,
  saveCookie,
} from "../../../persistence/browser/client/cookie";
import { refreshToken } from "../actions/freee-auth-actions";

export const useFreeeAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ユーザーがfreeeで認証されているかどうかを確認する
  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = getCookieValue<string>("freeeAccessToken", false);
        const expiresAt = getCookieValue<string>("freeeTokenExpiresAt", false);
        const isAuth = !!(
          accessToken &&
          expiresAt &&
          Number(expiresAt) > Date.now()
        );
        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 有効なアクセストークンを取得し、必要に応じて更新する
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const accessToken = getCookieValue<string>("freeeAccessToken", false);
      const refreshTokenValue = getCookieValue<string>(
        "freeeRefreshToken",
        false,
      );
      const expiresAt = getCookieValue<string>("freeeTokenExpiresAt", false);

      // 有効なアクセストークンがある場合はそれを返す
      if (accessToken && expiresAt && Number(expiresAt) > Date.now()) {
        return accessToken;
      }

      // リフレッシュトークンがある場合は、アクセストークンを更新してみる
      if (refreshTokenValue) {
        const result = await refreshToken(refreshTokenValue);

        if (result) {
          // 新しいトークンを保存する
          saveCookie({ key: "freeeAccessToken", value: result.accessToken });
          saveCookie({ key: "freeeRefreshToken", value: result.refreshToken });
          saveCookie({
            key: "freeeTokenExpiresAt",
            value: String(Date.now() + result.expiresIn * 1000),
          });

          // 認証状態を更新
          setIsAuthenticated(true);
          return result.accessToken;
        }
      }

      // 有効なトークンを取得できなかった場合はnullを返す
      setIsAuthenticated(false);
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      setIsAuthenticated(false);
      return null;
    }
  }, []);

  // freeeからログアウトする
  const logout = useCallback(() => {
    try {
      saveCookie({ key: "freeeAccessToken", value: "" });
      saveCookie({ key: "freeeRefreshToken", value: "" });
      saveCookie({ key: "freeeTokenExpiresAt", value: "" });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, []);

  return {
    isAuthenticated,
    isLoading,
    getAccessToken,
    logout,
  };
};
