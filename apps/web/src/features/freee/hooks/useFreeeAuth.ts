"use client";

import { FreeeAuthUsecase } from "@home-helper/core/usecase/household/freee/freee-auth-usecase";
import { useCallback, useEffect, useState } from "react";

export const useFreeeAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ユーザーがfreeeで認証されているかどうかを確認する
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("freeeAccessToken");
      const expiresAt = localStorage.getItem("freeeTokenExpiresAt");

      if (accessToken && expiresAt && Number(expiresAt) > Date.now()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 有効なアクセストークンを取得し、必要に応じて更新する
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const accessToken = localStorage.getItem("freeeAccessToken");
      const refreshToken = localStorage.getItem("freeeRefreshToken");
      const expiresAt = localStorage.getItem("freeeTokenExpiresAt");

      // 有効なアクセストークンがある場合はそれを返す
      if (accessToken && expiresAt && Number(expiresAt) > Date.now()) {
        return accessToken;
      }

      // リフレッシュトークンがある場合は、アクセストークンを更新してみる
      if (refreshToken) {
        const clientId = process.env.NEXT_PUBLIC_FREEE_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_FREEE_CLIENT_SECRET;

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
          // 新しいトークンを保存する
          localStorage.setItem("freeeAccessToken", result.accessToken);
          localStorage.setItem("freeeRefreshToken", result.refreshToken);
          localStorage.setItem(
            "freeeTokenExpiresAt",
            String(Date.now() + result.expiresIn * 1000),
          );

          setIsAuthenticated(true);
          return result.accessToken;
        }
      }

      // 有効なトークンを取得できなかった場合はnullを返す
      setIsAuthenticated(false);
      return null;
    } catch (error) {
      console.error("Error refreshing freee token:", error);
      setIsAuthenticated(false);
      return null;
    }
  }, []);

  // freeeからログアウトする
  const logout = useCallback(() => {
    localStorage.removeItem("freeeAccessToken");
    localStorage.removeItem("freeeRefreshToken");
    localStorage.removeItem("freeeTokenExpiresAt");
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    getAccessToken,
    logout,
  };
};
