"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenWithCode } from "../../../features/freee/actions/freee-auth-actions";
import { saveCookie } from "../../../persistence/browser/client/cookie";

export default function FreeeCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URLにエラーがあるかどうかを確認する
        const error = searchParams.get("error");
        if (error) {
          console.error("Error from freee:", error);
          setStatus("error");
          setErrorMessage(`認証エラー: ${error}`);
          return;
        }

        // URLから認証コードとstateを取得する
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (!code) {
          console.error("No authorization code received");
          setStatus("error");
          setErrorMessage("認証コードが見つかりません");
          return;
        }

        // CSRF対策：stateパラメータの検証
        const savedState =
          typeof window !== "undefined"
            ? sessionStorage.getItem("freeeAuthState")
            : null;
        if (!state || !savedState || state !== savedState) {
          console.error("State validation failed", { state, savedState });
          setStatus("error");
          setErrorMessage(
            "セキュリティ検証に失敗しました。もう一度認証をやり直してください。",
          );
          return;
        }

        // 検証が成功したらセッションストレージからstateを削除
        sessionStorage.removeItem("freeeAuthState");

        // サーバーアクションを使用してトークンを取得
        const tokenInfo = await getTokenWithCode(code);

        if (tokenInfo) {
          // クライアントサイドでCookieに保存
          saveCookie({ key: "freeeAccessToken", value: tokenInfo.accessToken });
          saveCookie({
            key: "freeeRefreshToken",
            value: tokenInfo.refreshToken,
          });
          saveCookie({
            key: "freeeTokenExpiresAt",
            value: String(Date.now() + tokenInfo.expiresIn * 1000),
          });

          setStatus("success");

          // 短い遅延の後、元のページにリダイレクトする
          setTimeout(() => {
            router.push("/household/search");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage("トークンの取得に失敗しました");
        }
      } catch (error) {
        console.error("Error handling freee callback:", error);
        setStatus("error");
        setErrorMessage("トークンの取得に失敗しました");
      }
    };

    void handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">freee連携</h1>

      {status === "loading" && (
        <div className="text-center">
          <p className="mb-4">認証処理中...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto" />
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="mb-4 text-green-600">認証に成功しました！</p>
          <p>元のページに戻ります...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="mb-4 text-red-600">エラーが発生しました</p>
          {errorMessage && <p className="mb-4">{errorMessage}</p>}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push("/household/search")}
            type="button"
          >
            戻る
          </button>
        </div>
      )}
    </div>
  );
}
