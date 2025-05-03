"use server";

import { fetchFreeeMaster } from "../server/fetch-freee-master";

/**
 * freeeのマスターデータを取得するサーバーアクション
 * LinkFreeeDetailコンポーネントから呼び出される
 */
export async function fetchFreeeMastersAction() {
  try {
    return await fetchFreeeMaster();
  } catch (error) {
    console.error("Error fetching freee masters:", error);
    throw new Error("freeeマスターデータの取得に失敗しました");
  }
}
