import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, redirectUri, clientId, clientSecret, grantType, refreshToken } = body;

    const baseUrl = "https://accounts.secure.freee.co.jp";

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    if (grantType === "authorization_code") {
      params.append("code", code);
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", redirectUri);
    } else if (grantType === "refresh_token") {
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refreshToken);
    } else {
      return NextResponse.json({ error: "Invalid grant type" }, { status: 400 });
    }

    const endpoint =
      grantType === "authorization_code" ? `${baseUrl}/public_api/token` : `${baseUrl}/api/1/token`;

    const response = await axios.post(endpoint, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in token proxy:", error);

    // エラーレスポンスの詳細情報を取得
    let errorMessage = "Failed to process token request";
    let statusCode = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.error || errorMessage;
      statusCode = error.response.status;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
