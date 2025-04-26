"use client";

import { FreeeAuthUsecase } from "@/core/usecase/household/freee/freee-auth-usecase";
import { useState } from "react";
import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";
import { useFreeeAuth } from "../../freee/hooks/useFreeeAuth";

export const FreeeCsvExportButton: FC = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    getAccessToken,
    logout,
  } = useFreeeAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);

      // Get client ID and client secret from environment variables
      const clientId = process.env.NEXT_PUBLIC_FREEE_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_FREEE_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        console.error("Freee client ID or client secret is not set");
        alert("Freee連携の設定が不足しています。管理者に連絡してください。");
        return;
      }

      // Create the usecase
      const freeeAuthUsecase = new FreeeAuthUsecase(clientId, clientSecret);

      // Get the current URL for the redirect URI
      const redirectUri = `${window.location.origin}/freee/callback`;

      // Get the authorization URL
      const result = await freeeAuthUsecase.handle({
        type: "getAuthUrl",
        redirectUri,
      });

      if (result.type === "authUrl") {
        // Redirect to the authorization URL
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error starting freee authentication:", error);
      alert("Freee連携の開始に失敗しました。もう一度お試しください。");
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

  return (
    <Button
      label={"freee連携"}
      onClick={handleAuthClick}
      type={"add"}
      disabled={isLoading}
    />
  );
};
