"use client";

import { type FC, useState, useTransition } from "react";
import { Button } from "../../../../components/ui/button/v5";
import { sortCategoriesByFrequencyAction } from "../../actions/sortCategoriesByFrequencyAction";

export const SortFrequentlyUsedCategoriesButton: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSortFrequentlyUsedCategories = async () => {
    if (isPending) return;

    setProgress(0);
    setTotal(0);
    setMessage(null);

    // サーバーアクションを実行
    startTransition(async () => {
      try {
        // 進捗コールバックは直接渡せないため、クライアント側で進捗を管理
        const result = await sortCategoriesByFrequencyAction();

        if (result.success) {
          setMessage(`成功: ${result.message}`);
        } else {
          setMessage(`エラー: ${result.message}`);
        }
      } catch (error) {
        console.error("Error sorting categories:", error);
        setMessage("エラー: カテゴリの並び替えに失敗しました");
      }
    });
  };

  return (
    <div>
      <Button
        onClick={handleSortFrequentlyUsedCategories}
        type="modify"
        label="よく使うカテゴリに並び替える"
        disabled={isPending}
      />

      {isPending && message && (
        <div className="mt-4 p-2 rounded bg-gray-100">
          <p className="text-sm">{message}</p>
        </div>
      )}

      {isPending && total > 0 && (
        <div className="mt-4">
          <div className="text-sm mb-1">
            処理中... {progress}/{total}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${Math.round((progress / total) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
