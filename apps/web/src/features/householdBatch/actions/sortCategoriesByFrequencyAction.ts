"use server";

import { CategoryRepository } from "../../../gateway/household/CategoryRepository";
import { sortCategoriesByFrequency } from "../../../usecase/household/sortCategoriesByFrequency";

/**
 * 進捗情報の型定義
 */
export type ProgressInfo =
  | {
      type: "progress";
      current: number;
      total: number;
      message?: string;
    }
  | {
      type: "complete";
      success: boolean;
      message: string;
    }
  | {
      type: "error";
      message: string;
    };

/**
 * カテゴリを使用頻度順に並び替えるサーバーアクション
 * ストリーミングレスポンスを使用して進捗情報をリアルタイムで返す
 */
export async function sortCategoriesByFrequencyAction(): Promise<
  ReadableStream<ProgressInfo>
> {
  console.log("[sortCategoriesByFrequencyAction] 開始");

  // ストリームを作成
  const stream = new TransformStream<ProgressInfo>();
  const writer = stream.writable.getWriter();

  // バックグラウンドで処理を実行
  (async () => {
    try {
      // リポジトリのインスタンスを作成
      console.log(
        "[sortCategoriesByFrequencyAction] リポジトリのインスタンスを作成",
      );
      const categoryRepository = new CategoryRepository();

      // 進捗コールバック関数
      const onProgress = async (current: number, total: number) => {
        console.log(
          `[sortCategoriesByFrequencyAction] 進捗: ${current}/${total}`,
        );
        await writer.write({
          type: "progress",
          current,
          total,
          message: `カテゴリを更新中... (${current}/${total})`,
        });
      };

      // ユースケースを実行
      console.log("[sortCategoriesByFrequencyAction] ユースケースを実行");
      const result = await sortCategoriesByFrequency({
        getRecentDetails: () => categoryRepository.getRecentDetails(),
        getAllCategories: () => categoryRepository.getAllCategories(),
        updateCategoryDisplayOrder: (categoryId, displayOrder) =>
          categoryRepository.updateCategoryDisplayOrder(
            categoryId,
            displayOrder,
          ),
        onProgress,
      });

      console.log(
        "[sortCategoriesByFrequencyAction] 完了",
        result.sortedCategories.length,
      );

      // 完了メッセージを送信
      await writer.write({
        type: "complete",
        success: true,
        message: `${result.sortedCategories.length}件のカテゴリを使用頻度順に並び替えました`,
      });
    } catch (error) {
      console.error("[sortCategoriesByFrequencyAction] エラー:", error);

      // エラーメッセージを送信
      await writer.write({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "カテゴリの並び替えに失敗しました",
      });
    } finally {
      // ストリームを閉じる
      await writer.close();
    }
  })();

  // ストリームを返す
  return stream.readable;
}
