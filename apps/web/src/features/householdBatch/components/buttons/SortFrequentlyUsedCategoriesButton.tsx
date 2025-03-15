"use client";

import type { FC } from "react";
import { Button } from "../../../../components/ui/button/v5";

export const SortFrequentlyUsedCategoriesButton: FC = () => {
  const handleSortFrequentlyUsedCategories = async () => {
    try {
      // クライアントコンポーネントでfindUserを使用するには、クライアントサイドで実行可能なAPIを使用する必要があります
      // 実際の実装では、APIルートを作成して呼び出すか、別の方法でグループIDを取得する必要があります

      // 例: const response = await fetch('/api/household/category/sort-by-frequency', { method: 'POST' });

      // 現在はモックとしてアラートを表示
      console.log("Sort frequently used categories");
      alert("カテゴリを使用頻度順に並び替えました");
    } catch (error) {
      console.error("Error sorting categories:", error);
      alert("カテゴリの並び替えに失敗しました");
    }
  };

  return (
    <Button
      onClick={handleSortFrequentlyUsedCategories}
      type="modify"
      label="よく使うカテゴリに並び替える"
    />
  );
};
