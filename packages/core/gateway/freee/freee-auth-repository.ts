import axios from "axios";
import type { FreeeAuthResponse, FreeeGateway } from "./freee-gateway";

export class FreeeAuthRepository implements FreeeGateway {
  private readonly baseUrl = "https://accounts.secure.freee.co.jp";
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * OAuth2フローの認証URLを取得する
   * @param redirectUri 認証後にリダイレクトするURI
   * @returns 認証URL
   */
  getAuthorizationUrl(redirectUri: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "accounting",
    });

    return `${this.baseUrl}/public_api/authorize?${params.toString()}`;
  }

  /**
   * 認証コードをアクセストークンと交換する
   * @param code リダイレクトから受け取った認証コード
   * @param redirectUri 認証リクエストで使用したのと同じリダイレクトURI
   * @returns アクセストークンを含む認証レスポンス
   */
  async getAccessToken(
    code: string,
    redirectUri: string,
  ): Promise<FreeeAuthResponse> {
    try {
      const response = await axios.post<FreeeAuthResponse>(
        `${this.baseUrl}/oauth/token`,
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw new Error("Failed to get access token from freee");
    }
  }

  /**
   * リフレッシュトークンを使用してアクセストークンを更新する
   * @param refreshToken リフレッシュトークン
   * @returns 新しいアクセストークンを含む認証レスポンス
   */
  async refreshAccessToken(refreshToken: string): Promise<FreeeAuthResponse> {
    try {
      const response = await axios.post<FreeeAuthResponse>(
        `${this.baseUrl}/oauth/token`,
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw new Error("Failed to refresh access token from freee");
    }
  }
}
