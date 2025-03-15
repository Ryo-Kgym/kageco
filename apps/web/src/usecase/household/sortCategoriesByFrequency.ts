import {
  type CategoryFrequency,
  calculateCategoryFrequency,
} from "../../domain/model/household/CategoryFrequency";

export type SortCategoriesByFrequencyInput = {
  getRecentDetails: () => Promise<{ categoryId: string | null }[]>;
  getAllCategories: () => Promise<
    { id: string; categoryName: string; displayOrder: number }[]
  >;
  updateCategoryDisplayOrder: (
    categoryId: string,
    displayOrder: number,
  ) => Promise<void>;
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
  // 1. 過去6ヶ月の明細を取得
  const details = await input.getRecentDetails();

  // 2. すべてのカテゴリを取得
  const categories = await input.getAllCategories();

  // 3. カテゴリの使用頻度を計算
  const sortedCategories = calculateCategoryFrequency(details, categories);

  // 4. カテゴリのdisplay_orderを更新
  const total = sortedCategories.length;
  for (let i = 0; i < total; i++) {
    const category = sortedCategories[i];
    if (!category) continue;

    const displayOrder = i + 1; // 1から始まる表示順
    await input.updateCategoryDisplayOrder(category.id, displayOrder);

    // 進捗を報告
    if (input.onProgress) {
      input.onProgress(i + 1, total);
    }
  }

  return { sortedCategories };
};
