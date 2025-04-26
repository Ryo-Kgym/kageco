"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";
import { TextInput } from "../../../components/ui/textInput/TextInput";
import { LoadingMask } from "../../../components/ui/v5/loading";
import { saveFreeeAuth } from "../../../persistence/browser/client/freee-auth";
import {
  getAuthorizationUrl,
  getTokenWithCode,
} from "../../freee/actions/freee-auth-actions";
import { useFreeeAuth } from "../../freee/hooks/use-freee-auth";

export const FreeeCsvExportButton: FC = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    errorMessage,
    isTokenProcessing,
    getAccessToken,
    logout,
    clearErrorMessage,
  } = useFreeeAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authFlowState, setAuthFlowState] = useState<
    "initial" | "url_opened" | "token_obtained"
  >("initial");

  // マスク表示の状態を計算
  const showMask = isTokenProcessing || isLoading;

  // マスクに表示するメッセージを設定
  const maskMessage = isTokenProcessing
    ? "トークン取得中です。しばらくお待ちください..."
    : "処理中です。しばらくお待ちください...";

  // エラーメッセージがある場合は表示する
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      clearErrorMessage();
    }
  }, [errorMessage, clearErrorMessage]);

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);
      // サーバーアクションを使用して認証URLとstateを取得
      const authResult = await getAuthorizationUrl();
      if (authResult?.url) {
        // stateパラメータをセッションストレージに保存（CSRF対策）
        sessionStorage.setItem("freeeAuthState", authResult.state);

        // 別タブで認証URLを開く
        window.open(authResult.url, "_blank");
        setAuthFlowState("url_opened");
        return true;
      }
    } catch (error) {
      console.error("Error starting freee authentication:", error);
      alert("Freee連携の開始に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTokenClick = async () => {
    if (!authCode.trim()) {
      alert("認可コードを入力してください。");
      return;
    }

    try {
      setIsLoading(true);
      // サーバーアクションを使用してトークンを取得
      const tokenInfo = await getTokenWithCode(authCode);
      if (tokenInfo) {
        // クライアントサイドでCookieに保存
        saveFreeeAuth({
          accessToken: tokenInfo.accessToken,
          refreshToken: tokenInfo.refreshToken,
          expiresIn: tokenInfo.expiresIn,
        });

        setAuthFlowState("token_obtained");
        // リロードして認証状態を更新
        window.location.reload();
      } else {
        alert(
          "トークンの取得に失敗しました。認可コードが正しいか確認してください。",
        );
      }
    } catch (error) {
      console.error("Error getting token with code:", error);
      alert("トークンの取得に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportClick = async () => {
    try {
      setIsLoading(true);

      // Get a valid access token
      const accessToken = await getAccessToken();

      if (!accessToken) {
        alert("Freee連携の認証情報が無効です。再認証してください。");
        return;
      }

      // Here you would call the API to export the CSV
      // For now, just log the access token
      console.log("Access token:", accessToken);
      alert("CSV出力機能は現在実装中です。");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("CSV出力に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    alert("Freee連携を解除しました。");
  };

  // コンポーネントの内容を定義
  const renderContent = () => {
    if (isAuthLoading) {
      return (
        <Button
          label={"freee連携CSV出力"}
          onClick={() => {}}
          type={"add"}
          disabled={true}
        />
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex space-x-2">
          <Button
            label={"freee連携CSV出力"}
            onClick={handleExportClick}
            type={"add"}
            disabled={isLoading}
          />
          <Button
            label={"連携解除"}
            onClick={handleLogoutClick}
            type={"dangerous"}
            disabled={isLoading}
          />
        </div>
      );
    }

    if (authFlowState === "url_opened") {
      return (
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-600">
            freee認証ページで認証を完了し、表示された認可コードを入力してください
          </div>
          <div className="flex space-x-2">
            <TextInput
              value={authCode}
              setValue={setAuthCode}
              placeholder="認可コードを入力"
              label=""
            />
            <Button
              label={"トークン取得"}
              onClick={handleGetTokenClick}
              type={"add"}
              disabled={isLoading}
            />
          </div>
        </div>
      );
    }

    return (
      <Button
        label={"freee連携"}
        onClick={handleAuthClick}
        type={"add"}
        disabled={isLoading}
      />
    );
  };

  // LoadingMaskでラップして返す
  return (
    <LoadingMask isLoading={showMask} message={maskMessage}>
      {renderContent()}
    </LoadingMask>
  );
};
