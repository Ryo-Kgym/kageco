#!/bin/bash

# --- color & function ---
# ./tool/ ディレクトリに colors.sh や functions.sh があることを前提とします
source ./tool/color.sh
source ./tool/function.sh

# --- 処理関数 ---

# node_modules の削除と再生成
handle_node_modules() {
  echo ""
  echo_info "🗑️  node_modules を削除中..."
  find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

  echo_info "🗑️  .turbo ディレクトリを削除中..."
  find . -name ".turbo" -type d -prune -exec rm -rf '{}' +

  echo_info "🗑️  tsconfig.tsbuildinfo ファイルを削除中..."
  find . -name "tsconfig.tsbuildinfo" -type f -exec rm -f '{}' +

  echo_info "📦 pnpm install を実行中..."
  if ! pnpm install; then
    echo_error "❌ pnpm install でエラーが発生しました"
    return 1
  fi
  echo_success "✅ pnpm install 完了"

  echo_info "🔧 pnpm db:generate を実行中..."
  if ! pnpm db:generate; then
    echo_error "❌ pnpm db:generate でエラーが発生しました"
    return 1
  fi
  echo_success "✅ pnpm db:generate 完了"
}

# docker container の削除と再起動
handle_docker() {
  echo ""
  echo_info "🐳 docker container と volumes を削除中..."
  if ! docker compose down -v; then
    echo_error "❌ docker compose down でエラーが発生しました"
    return 1
  fi
  echo_success "✅ docker container と volumes の削除完了"

  echo_info "🚀 docker compose up -d を実行中..."
  if ! docker compose up -d; then
    echo_error "❌ docker compose up -d でエラーが発生しました"
    return 1
  fi
  echo_success "✅ docker compose up -d 完了"

  echo_info "🔧 pnpm db:migrate:deploy を実行中..."
  if ! pnpm db:migrate:deploy; then
    echo_error "❌ pnpm db:migrate:deploy でエラーが発生しました"
    return 1
  fi
  echo_success "✅ pnpm db:migrate:deploy 完了"
}

# --- 対話モード関数 ---
show_interactive_menu() {
  # 初期確認
  if ! confirm "環境を初期化しますか？"; then
    echo_info "初期化をキャンセルしました。"
    exit 0
  fi
  echo ""

  # 各項目の確認
  local node_modules_answer=false
  if confirm "1. node_modules, .turbo, tsconfig.tsbuildinfo をすべて削除しますか？ (その後 install, db:generate を実行)"; then
    node_modules_answer=true
  fi

  echo ""
  local docker_answer=false
  if confirm "2. docker container を削除しますか？ (その後 compose up, migrate:deploy を実行)"; then
    docker_answer=true
  fi

  # 何も選択されなかった場合
  if [ "$node_modules_answer" = false ] && [ "$docker_answer" = false ]; then
      echo_info "何も選択されなかったので終了します。"
      exit 0
  fi

  echo ""
  echo_info "=== 実行内容の確認 ==="
  if [ "$node_modules_answer" = true ]; then
    echo_success "✓ node_modules の削除 → pnpm install → pnpm db:generate"
  else
    echo_warn "✗ node_modules の処理をスキップ"
  fi

  if [ "$docker_answer" = true ]; then
    echo_success "✓ docker container の削除 → docker compose up → pnpm db:migrate:deploy"
  else
    echo_warn "✗ docker container の処理をスキップ"
  fi

  echo ""
  if ! confirm "上記の内容で実行しますか？"; then
    echo_info "実行をキャンセルしました。"
    exit 0
  fi

  echo ""
  echo_info "=== 実行開始 ==="

  if [ "$node_modules_answer" = true ]; then
    handle_node_modules
  fi

  if [ "$docker_answer" = true ]; then
    handle_docker
  fi
}

# --- 引数パーサー ---
parse_args() {
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -e)
        shift
        while [ "$#" -gt 0 ] && ! [[ "$1" =~ ^- ]]; do
          case "$1" in
            node_modules)
              execute_node=true
              ;;
            docker)
              execute_docker=true
              ;;
            *)
              echo_error "不明な引数です: $1"
              ;;
          esac
          shift
        done
        ;;
      *)
        shift
        ;;
    esac
  done
}

# --- main ---
main() {
  echo_info "=== 環境初期化スクリプト ==="
  echo ""

  local execute_node=false
  local execute_docker=false

  # 引数があるかチェック
  if [ "$#" -gt 0 ]; then
    # 引数モード (確認なしで実行)
    parse_args "$@"
    echo_info "=== 実行開始 ==="
    if [ "$execute_node" = true ]; then
      handle_node_modules
    fi
    if [ "$execute_docker" = true ]; then
      handle_docker
    fi
  else
    # 対話モード
    show_interactive_menu
  fi

  echo ""
  echo_success "=== 初期化完了 ==="
  echo "すべての処理が完了しました。"
  exit 0
}

# --- スクリプト実行 ---
main "$@"