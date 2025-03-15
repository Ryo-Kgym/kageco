/**
 * カテゴリの使用頻度を表すエンティティ
 */
export type CategoryFrequency = {
  id: string;
  categoryName: string;
  frequency: number;
  displayOrder: number;
};

/**
 * カテゴリの使用頻度を計算するドメインサービス
 */
export const calculateCategoryFrequency = (
  details: { categoryId: string | null }[],
  categories: { id: string; categoryName: string; displayOrder: number }[],
): CategoryFrequency[] => {
  // カテゴリごとの使用回数を集計
  const categoryCounts: Record<string, number> = {};

  details.forEach((detail) => {
    if (detail.categoryId) {
      const categoryId = detail.categoryId;
      categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
    }
  });

  // カテゴリ情報と使用回数を結合
  const categoryFrequencies: CategoryFrequency[] = categories.map(
    (category) => ({
      id: category.id,
      categoryName: category.categoryName,
      frequency: categoryCounts[category.id] || 0,
      displayOrder: category.displayOrder,
    }),
  );

  // 使用回数の多い順にソート
  return categoryFrequencies.sort((a, b) => b.frequency - a.frequency);
};
