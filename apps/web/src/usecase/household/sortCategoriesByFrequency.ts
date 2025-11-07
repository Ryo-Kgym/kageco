import {
  type CategoryFrequency,
  calculateCategoryFrequency,
} from "../../domain/model/household/CategoryFrequency";

export type SortCategoriesByFrequencyInput = {
  getRecentDetails: () => Promise<{ categoryId: string | null }[]>;
  getAllCategories: () => Promise<{ id: string; categoryName: string; displayOrder: number }[]>;
  updateCategoryDisplayOrder: (categoryId: string, displayOrder: number) => Promise<void>;
  onProgress?: (progress: number, total: number) => void;
};

export type SortCategoriesByFrequencyOutput = {
  sortedCategories: CategoryFrequency[];
};

/**
 * カテゴリを使用頻度順に並び替えるユースケース
 */
export const sortCategoriesByFrequency = async (
  input: SortCategoriesByFrequencyInput,
): Promise<SortCategoriesByFrequencyOutput> => {
  console.log("[sortCategoriesByFrequency] 開始");

  // 1. 過去6ヶ月の明細を取得
  console.log("[sortCategoriesByFrequency] 過去6ヶ月の明細を取得中...");
  const details = await input.getRecentDetails();
  console.log(`[sortCategoriesByFrequency] 明細取得完了: ${details.length}件`);

  // 2. すべてのカテゴリを取得
  console.log("[sortCategoriesByFrequency] すべてのカテゴリを取得中...");
  const categories = await input.getAllCategories();
  console.log(`[sortCategoriesByFrequency] カテゴリ取得完了: ${categories.length}件`);

  // 3. カテゴリの使用頻度を計算
  console.log("[sortCategoriesByFrequency] カテゴリの使用頻度を計算中...");
  const sortedCategories = calculateCategoryFrequency(details, categories);
  console.log(`[sortCategoriesByFrequency] 計算完了: ${sortedCategories.length}件`);

  // 4. カテゴリのdisplay_orderを更新
  console.log("[sortCategoriesByFrequency] カテゴリの表示順を更新中...");
  const total = sortedCategories.length;
  for (let i = 0; i < total; i++) {
    const category = sortedCategories[i];
    if (!category) continue;

    const displayOrder = i + 1; // 1から始まる表示順
    console.log(
      `[sortCategoriesByFrequency] カテゴリ更新中 (${i + 1}/${total}): ID=${category.id}, 名前=${category.categoryName}, 表示順=${displayOrder}`,
    );
    await input.updateCategoryDisplayOrder(category.id, displayOrder);
    console.log(`[sortCategoriesByFrequency] カテゴリ更新完了 (${i + 1}/${total})`);

    // 進捗を報告
    if (input.onProgress) {
      input.onProgress(i + 1, total);
    }
  }

  console.log("[sortCategoriesByFrequency] 完了");
  return { sortedCategories };
};
