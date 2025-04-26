# freee API 連携

このディレクトリには、freee会計APIと連携するためのコードが含まれています。

## セットアップ

1. freee開発者コンソールでアプリケーションを登録してください: https://developer.freee.co.jp/
2. 以下の環境変数を`.env.local`ファイルに設定してください:

```
NEXT_PUBLIC_FREEE_CLIENT_ID=your_client_id
NEXT_PUBLIC_FREEE_CLIENT_SECRET=your_client_secret
```

## 使用方法

### 認証

認証フローはOAuth2を使用して実装されています。`FreeeAuthUsecase`クラスは以下のメソッドを提供します:

1. 認証URLの取得
2. 認証コードをアクセストークンと交換
3. アクセストークンの更新

例:

```typescript
import { FreeeAuthUsecase } from "@home-helper/core/usecase/household/freee/freee-auth-usecase";

// ユースケースを作成
const freeeAuthUsecase = new FreeeAuthUsecase(
  process.env.NEXT_PUBLIC_FREEE_CLIENT_ID!,
  process.env.NEXT_PUBLIC_FREEE_CLIENT_SECRET!
);

// 認証URLを取得
const result = await freeeAuthUsecase.handle({
  type: "getAuthUrl",
  redirectUri: "https://your-app.com/freee/callback",
});

if (result.type === "authUrl") {
  // ユーザーを認証URLにリダイレクト
  window.location.href = result.url;
}
```

### Reactフック

Reactコンポーネントで簡単に連携するためのReactフックが提供されています:

```typescript
import { useFreeeAuth } from "@/features/freee/hooks/useFreeeAuth";

// 認証状態と関数を取得
const { isAuthenticated, isLoading, getAccessToken, logout } = useFreeeAuth();

// 有効なアクセストークンを取得（必要に応じて自動的に更新）
const accessToken = await getAccessToken();
if (accessToken) {
  // アクセストークンを使用してAPIを呼び出す
}

// freeeからログアウト
logout();
```

## 参考資料

- [freee API ドキュメント](https://developer.freee.co.jp/reference/)
