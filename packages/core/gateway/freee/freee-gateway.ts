export interface FreeeAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}

/**
 * freee API認証ゲートウェイのインターフェース
 */
export interface FreeeGateway {
  /**
   * OAuth2フローの認証URLを取得する
   * @param redirectUri 認証後にリダイレクトするURI
   * @returns 認証URL
   */
  getAuthorizationUrl(redirectUri: string): string;

  /**
   * 認証コードをアクセストークンと交換する
   * @param code リダイレクトから受け取った認証コード
   * @param redirectUri 認証リクエストで使用したのと同じリダイレクトURI
   * @returns アクセストークンを含む認証レスポンス
   */
  getAccessToken(code: string, redirectUri: string): Promise<FreeeAuthResponse>;

  /**
   * リフレッシュトークンを使用してアクセストークンを更新する
   * @param refreshToken リフレッシュトークン
   * @returns 新しいアクセストークンを含む認証レスポンス
   */
  refreshAccessToken(refreshToken: string): Promise<FreeeAuthResponse>;
}
