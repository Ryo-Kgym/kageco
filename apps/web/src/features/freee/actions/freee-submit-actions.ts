"use server";

import { submitFreeeRecords } from "../server/submit-freee-records";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引データを送信するサーバーアクション
 * @param records 送信するレコード配列
 * @returns 処理結果
 */
export async function submitFreeeDeals(records: UnifiedRecord[]): Promise<{
  success: boolean;
  error?: Error;
}> {
  try {
    return await submitFreeeRecords(records);
  } catch (error) {
    console.error("Error submitting freee deals:", error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}
