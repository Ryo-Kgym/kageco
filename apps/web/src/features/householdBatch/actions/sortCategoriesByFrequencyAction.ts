"use server";

import { CategoryRepository } from "../../../gateway/household/CategoryRepository";
import { sortCategoriesByFrequency } from "../../../usecase/household/sortCategoriesByFrequency";

/**
 * カテゴリを使用頻度順に並び替えるサーバーアクション
 */
export async function sortCategoriesByFrequencyAction(
  progressCallback?: (progress: number, total: number) => void,
): Promise<{ success: boolean; message: string }> {
  console.log("[sortCategoriesByFrequencyAction] 開始");
  try {
    // リポジトリのインスタンスを作成
    console.log(
      "[sortCategoriesByFrequencyAction] リポジトリのインスタンスを作成",
    );
    const categoryRepository = new CategoryRepository();

    // ユースケースを実行
    console.log("[sortCategoriesByFrequencyAction] ユースケースを実行");
    const result = await sortCategoriesByFrequency({
      getRecentDetails: () => categoryRepository.getRecentDetails(),
      getAllCategories: () => categoryRepository.getAllCategories(),
      updateCategoryDisplayOrder: (categoryId, displayOrder) =>
        categoryRepository.updateCategoryDisplayOrder(categoryId, displayOrder),
      onProgress: progressCallback,
    });

    console.log(
      "[sortCategoriesByFrequencyAction] 完了",
      result.sortedCategories.length,
    );
    return {
      success: true,
      message: `${result.sortedCategories.length}件のカテゴリを使用頻度順に並び替えました`,
    };
  } catch (error) {
    console.error("[sortCategoriesByFrequencyAction] エラー:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "カテゴリの並び替えに失敗しました",
    };
  }
}
