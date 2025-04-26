"use client";

import { FreeeAuthUsecase } from "@/core/usecase/household/freee/freee-auth-usecase";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

        // URLから認証コードを取得する
        const code = searchParams.get("code");
        if (!code) {
          console.error("No authorization code received");
          setStatus("error");
          setErrorMessage("認証コードが見つかりません");
          return;
        }

        // 環境変数からクライアントIDとクライアントシークレットを取得する
        const clientId = process.env.NEXT_PUBLIC_FREEE_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_FREEE_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          console.error("Freee client ID or client secret is not set");
          setStatus("error");
          setErrorMessage("Freee連携の設定が不足しています");
          return;
        }

        // ユースケースを作成する
        const freeeAuthUsecase = new FreeeAuthUsecase(clientId, clientSecret);

        // リダイレクトURIを取得する（認証リクエストで使用したものと同じ）
        const redirectUri = `${window.location.origin}/freee/callback`;

        // 認証コードをアクセストークンと交換する
        const result = await freeeAuthUsecase.handle({
          type: "getToken",
          code,
          redirectUri,
        });

        if (result.type === "token") {
          // トークンをlocalStorageまたはより安全なストレージに保存する
          localStorage.setItem("freeeAccessToken", result.accessToken);
          localStorage.setItem("freeeRefreshToken", result.refreshToken);
          localStorage.setItem(
            "freeeTokenExpiresAt",
            String(Date.now() + result.expiresIn * 1000),
          );

          setStatus("success");

          // 短い遅延の後、元のページにリダイレクトする
          setTimeout(() => {
            router.push("/household/search");
          }, 2000);
        }
      } catch (error) {
        console.error("Error handling freee callback:", error);
        setStatus("error");
        setErrorMessage("トークンの取得に失敗しました");
      }
    };

    handleCallback();
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
