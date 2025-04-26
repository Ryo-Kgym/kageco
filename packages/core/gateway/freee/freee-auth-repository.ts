import axios from "axios";
import type { FreeeAuthResponse, FreeeGateway } from "./freee-gateway";

export class FreeeAuthRepository implements FreeeGateway {
  private readonly baseUrl = "https://accounts.secure.freee.co.jp";
  private readonly apiBaseUrl =
    typeof window !== "undefined"
      ? "/api/freee"
      : "http://localhost:3000/api/freee";
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * OAuth2フローの認証URLを取得する
   * @param redirectUri 認証後にリダイレクトするURI
   * @returns 認証URLとstate（CSRF対策用のランダムな文字列）
   */
  getAuthorizationUrl(redirectUri: string): { url: string; state: string } {
    // CSRF対策のためのランダムな文字列を生成
    const state = this.generateRandomState();

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "accounting",
      state: state,
      prompt: "select_company", // 事業所選択を促す
    });

    return {
      url: `${this.baseUrl}/public_api/authorize?${params.toString()}`,
      state: state,
    };
  }

  /**
   * CSRF対策用のランダムな文字列を生成する
   * @returns ランダムな文字列
   */
  private generateRandomState(): string {
    // 十分な長さのランダムな文字列を生成
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 32; // 十分な長さ

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
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
      // curl -i -X POST \
      //  -H "Content-Type:application/x-www-form-urlencoded" \
      //  -d "grant_type=authorization_code" \
      //  -d "client_id=アプリのClient ID" \
      //  -d "client_secret=アプリのClient Secret" \
      //  -d "code=取得した認可コード" \
      //  -d "redirect_uri=アプリのencodedコールバックURL" \
      //  "https://accounts.secure.freee.co.jp/public_api/token"
      const response = await axios.post<FreeeAuthResponse>(
        `${this.baseUrl}/public_api/token`,
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
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
        `${this.apiBaseUrl}/token`,
        {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          grantType: "refresh_token",
          refreshToken,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw new Error("Failed to refresh access token from freee");
    }
  }
}
