"use client";

import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { LoadingMask } from "../../../components/ui/v5/loading";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { saveCookie } from "../../../persistence/browser/client/cookie";
import { saveFreeeAuth } from "../../../persistence/browser/client/freee-auth";
import { useNavigation } from "../../../routing/client/useNavigation";
import { paths } from "../../../routing/paths";
import {
  getAuthorizationUrl,
  getTokenWithCode,
} from "../../freee/actions/freee-auth-actions";
import { useFreeeAuth } from "../../freee/hooks/use-freee-auth";
import { FreeeAuthCodeInput } from "./freee-auth-code-input";
import { FreeeAuthenticated } from "./freee-authenticated";
import { FreeeInitialState } from "./freee-initial-state";
import { FreeeLoading } from "./freee-loading";

export const FreeeCsvExportButton: FC = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    errorMessage,
    isTokenProcessing,
    getAccessToken,
    logout,
    clearErrorMessage,
    setIsAuthenticated,
  } = useFreeeAuth();
  const router = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authFlowState, setAuthFlowState] = useState<
    "initial" | "url_opened" | "token_obtained"
  >("initial");
  const searchParams = useSearchParams();
  // マスク表示の状態を計算
  const showMask = isTokenProcessing || isLoading;

  // マスクに表示するメッセージを設定
  const maskMessage = isTokenProcessing
    ? "トークン取得中です。しばらくお待ちください..."
    : "処理中です。しばらくお待ちください...";

  // エラーメッセージがある場合は表示する
  useEffect(() => {
    if (errorMessage) {
      errorPopup(errorMessage);
      clearErrorMessage();
    }
  }, [errorMessage, clearErrorMessage]);

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);
      // サーバーアクションを使用して認証URLとstateを取得
      const authResult = await getAuthorizationUrl();
      if (authResult?.url) {
        saveCookie({ key: "freeeAuthState", value: authResult.state });

        // 別タブで認証URLを開く
        window.open(authResult.url, "_blank");
        setAuthFlowState("url_opened");
        return true;
      }
    } catch (error) {
      console.error("Error starting freee authentication:", error);
      errorPopup("Freee連携の開始に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTokenClick = async () => {
    if (!authCode.trim()) {
      successPopup("認可コードを入力してください。");
      return;
    }

    try {
      setIsLoading(true);
      // サーバーアクションを使用してトークンを取得
      const tokenInfo = await getTokenWithCode(authCode);
      if (tokenInfo) {
        saveFreeeAuth(tokenInfo);

        setAuthFlowState("token_obtained");
        // 認証状態を更新
        setIsAuthenticated(true);
      } else {
        errorPopup(
          "トークンの取得に失敗しました。認可コードが正しいか確認してください。",
        );
      }
    } catch (error) {
      console.error("Error getting token with code:", error);
      errorPopup("トークンの取得に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportClick = async () => {
    try {
      setIsLoading(true);

      const accessToken = await getAccessToken();

      if (!accessToken) {
        errorPopup("Freee連携の認証情報が無効です。再認証してください。");
        return;
      }

      // freee連携ページへ遷移
      router.push(paths.household.freee.insert(searchParams));
    } catch (error) {
      console.error("Error exporting CSV:", error);
      errorPopup("CSV出力に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    successPopup("Freee連携を解除しました。");
  };

  // コンポーネントの内容を定義
  const renderContent = () => {
    if (isAuthLoading) {
      return <FreeeLoading />;
    }

    if (isAuthenticated) {
      return (
        <FreeeAuthenticated
          handleExportClick={handleExportClick}
          handleLogoutClick={handleLogoutClick}
          isLoading={isLoading}
        />
      );
    }

    if (authFlowState === "url_opened") {
      return (
        <FreeeAuthCodeInput
          authCode={authCode}
          setAuthCode={setAuthCode}
          handleGetTokenClick={handleGetTokenClick}
          isLoading={isLoading}
        />
      );
    }

    return (
      <FreeeInitialState
        handleAuthClick={handleAuthClick}
        isLoading={isLoading}
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
