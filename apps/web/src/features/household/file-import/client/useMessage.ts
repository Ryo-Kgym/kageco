import { useEffect, useState } from "react";

export const useMessage = (loadFile: string) => {
  const [message, setMessage] = useState<string[]>([]);

  useEffect(() => {
    // @ts-expect-error FIXME ここでのseparatorは、改行コードの文字列を表す
    const separator = "\n" || "\r\n" || "\r";
    const rows = loadFile.split(separator);
    const headerColumns = rows[0]?.split(",").length ?? 0;

    setMessage(
      rows
        .map((r, i) => {
          if (r.split(",").length !== headerColumns) {
            return `行${i + 1}の列数が不正です。${r.split(",").length} !== ${headerColumns}\r`;
          }
          return undefined;
        })
        .filter((m) => !!m) as string[],
    );
  }, [loadFile]);

  return { message };
};
