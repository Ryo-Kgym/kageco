import { useState } from "react";

/**
 * 引用符内のカンマを処理するCSVパーサー
 * @param csvText 処理するCSVテキスト
 * @returns 処理後のCSVテキスト
 */
export const processQuotedCsv = (csvText: string): string => {
  // 行ごとに処理
  const rows = csvText.split("\n");
  const processedRows = rows.map((row) => {
    // 引用符内のカンマを一時的に別の文字に置き換える
    let inQuotes = false;
    let processedRow = "";

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        inQuotes = !inQuotes;
        // 引用符は削除
        continue;
      }

      if (char === "," && inQuotes) {
        // 引用符内のカンマは完全に除去
        // 何も追加しない
      } else {
        processedRow += char;
      }
    }

    return processedRow;
  });

  return processedRows.join("\n");
};

/**
 * 引用符内のカンマを処理するためのフック
 */
export const useProcessQuotedCsv = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * CSVテキストを処理する
   * @param csvText 処理するCSVテキスト
   * @returns 処理後のCSVテキスト
   */
  const processCsv = (csvText: string): string => {
    setIsProcessing(true);
    try {
      return processQuotedCsv(csvText);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCsv,
    isProcessing,
  };
};
