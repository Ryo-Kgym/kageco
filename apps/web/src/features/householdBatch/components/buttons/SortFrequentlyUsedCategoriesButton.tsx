"use client";

import { type FC, useState, useTransition } from "react";
import { Button } from "../../../../components/ui/button/v5";
import {
  type ProgressInfo,
  sortCategoriesByFrequencyAction,
} from "../../actions/sortCategoriesByFrequencyAction";

export const SortFrequentlyUsedCategoriesButton: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleSortFrequentlyUsedCategories = async () => {
    if (isPending) return;

    setProgress(0);
    setTotal(0);
    setMessage(null);
    setIsSuccess(null);

    // サーバーアクションを実行
    startTransition(async () => {
      try {
        // ストリーミングレスポンスを取得
        const stream = await sortCategoriesByFrequencyAction();

        // ReadableStreamを処理
        const reader = stream.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            // 進捗情報を処理
            const progressInfo = value as ProgressInfo;

            switch (progressInfo.type) {
              case "progress":
                // 進捗状況を更新
                setProgress(progressInfo.current);
                setTotal(progressInfo.total);
                if (progressInfo.message) {
                  setMessage(progressInfo.message);
                }
                break;

              case "complete":
                // 完了メッセージを表示
                setIsSuccess(progressInfo.success);
                setMessage(
                  progressInfo.success
                    ? `成功: ${progressInfo.message}`
                    : `エラー: ${progressInfo.message}`,
                );
                break;

              case "error":
                // エラーメッセージを表示
                setIsSuccess(false);
                setMessage(`エラー: ${progressInfo.message}`);
                break;
            }
          }
        } finally {
          reader.releaseLock();
        }
      } catch (error) {
        console.error("Error sorting categories:", error);
        setIsSuccess(false);
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
        <div
          className={`mt-4 p-2 rounded ${
            isSuccess === null ? "bg-gray-100" : isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
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
