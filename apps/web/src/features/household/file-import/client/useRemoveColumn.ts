import { useState } from "react";

/**
 * CSVデータから特定の列を削除する
 * @param csvText 処理するCSVテキスト
 * @param columnIndex 削除する列のインデックス（0から始まる）
 * @returns 処理後のCSVテキスト
 */
export const removeColumn = (csvText: string, columnIndex: number): string => {
  if (columnIndex < 0) return csvText;

  // 行ごとに処理
  const rows = csvText.split("\n");
  const processedRows = rows.map((row) => {
    // カンマで分割
    const columns = row.split(",");

    // 指定された列が存在する場合のみ削除
    if (columnIndex < columns.length) {
      columns.splice(columnIndex, 1);
    }

    // 再度カンマで結合
    return columns.join(",");
  });

  return processedRows.join("\n");
};

/**
 * CSVデータから列を削除するためのフック
 */
export const useRemoveColumn = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * CSVテキストから特定の列を削除する
   * @param csvText 処理するCSVテキスト
   * @param columnIndex 削除する列のインデックス（0から始まる）
   * @returns 処理後のCSVテキスト
   */
  const removeColumnFromCsv = (
    csvText: string,
    columnIndex: number,
  ): string => {
    setIsProcessing(true);
    try {
      const result = removeColumn(csvText, columnIndex);
      return result;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    removeColumnFromCsv,
    isProcessing,
  };
};
