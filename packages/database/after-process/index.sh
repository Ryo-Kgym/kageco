#!/bin/bash

# スクリプトが配置されているディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# プロジェクトルートディレクトリ（3階層上）
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# .envファイルのパス
ENV_FILE="$PROJECT_ROOT/.env"

# .envファイルが存在するかチェック
if [ ! -f "$ENV_FILE" ]; then
    echo "エラー: .envファイルが見つかりません: $ENV_FILE"
    exit 1
fi

# .envファイルを読み込み
echo ".envファイルを読み込んでいます..."
# shellcheck disable=SC1090
source "$ENV_FILE"
source "$SCRIPT_DIR/../.env"

# 必要な環境変数をチェック
if [ -z "$DATABASE_URL" ]; then
    echo "エラー: DATABASE_URL 環境変数が設定されていません"
    exit 1
fi

if [ -z "$APP_USER" ]; then
    echo "エラー: APP_USER 環境変数が設定されていません"
    exit 1
fi


echo "データベースに接続して処理を実行します..."

# app_userへの権限付与SQLを実行
echo "${APP_USER}への権限を付与しています..."
psql "$DATABASE_URL" << EOF
GRANT USAGE ON SCHEMA public TO ${APP_USER};
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${APP_USER};
ALTER DEFAULT PRIVILEGES FOR USER ${APP_USER} IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${APP_USER};
EOF

if [ $? -ne 0 ]; then
    echo "エラー: app_userへの権限付与に失敗しました"
    exit 1
fi

echo "${APP_USER}への権限付与が完了しました"

# RLS設定SQLファイルを実行
RLS_SQL_FILE="$SCRIPT_DIR/rls-setting.sql"

if [ ! -f "$RLS_SQL_FILE" ]; then
    echo "エラー: rls-setting.sqlファイルが見つかりません: $RLS_SQL_FILE"
    exit 1
fi

echo "RLS設定を適用しています..."
psql "$DATABASE_URL" -f "$RLS_SQL_FILE"

if [ $? -ne 0 ]; then
    echo "エラー: RLS設定の適用に失敗しました"
    exit 1
fi

echo "RLS設定の適用が完了しました"
echo "すべての処理が正常に完了しました"