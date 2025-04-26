"use client";

import { useCallback, useEffect, useState } from "react";
import { getCookieValue } from "../../../persistence/browser/client/cookie";
import {
  clearFreeeAuth,
  isFreeeAuthenticated,
  saveFreeeAuth,
} from "../../../persistence/browser/client/freee-auth";
import { refreshToken } from "../actions/freee-auth-actions";

export const useFreeeAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTokenProcessing, setIsTokenProcessing] = useState<boolean>(false);

  // ユーザーがfreeeで認証されているかどうかを確認する
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuth = isFreeeAuthenticated();
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
      setIsTokenProcessing(true);

      const accessToken = getCookieValue<string>("freeeAccessToken", false);
      const refreshTokenValue = getCookieValue<string>(
        "freeeRefreshToken",
        false,
      );

      // 有効なアクセストークンがある場合はそれを返す
      if (isFreeeAuthenticated()) {
        setIsTokenProcessing(false);
        return accessToken;
      }

      // リフレッシュトークンがある場合は、アクセストークンを更新してみる
      if (refreshTokenValue) {
        const result = await refreshToken(refreshTokenValue);

        if (result) {
          saveFreeeAuth({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: result.expiresIn,
          });

          // 認証状態を更新
          setIsAuthenticated(true);
          setIsTokenProcessing(false);
          return result.accessToken;
        }
      }

      // 有効なトークンを取得できなかった場合はnullを返す
      setIsAuthenticated(false);
      setIsTokenProcessing(false);
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      setIsAuthenticated(false);
      setErrorMessage("トークンの取得に失敗しました。再度お試しください。");
      setIsTokenProcessing(false);
      return null;
    }
  }, []);

  // freeeからログアウトする
  const logout = useCallback(() => {
    try {
      clearFreeeAuth();
      setIsAuthenticated(false);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, []);

  // エラーメッセージをクリアする
  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    errorMessage,
    isTokenProcessing,
    getAccessToken,
    logout,
    clearErrorMessage,
  };
};
