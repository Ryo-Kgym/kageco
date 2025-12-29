import type { ImportFileType } from "./importFileType";

export type ImportFileColumn =
  keyof (typeof importFileFields)[keyof typeof importFileFields];

export const importFileFields: Record<
  ImportFileType,
  Record<string, { columnName: string; label: string }>
> = {
  creditCsv: {
    settlementDate: {
      columnName: "settlementDate",
      label: "決済日",
    },
    amount: {
      columnName: "amount",
      label: "金額",
    },
    memo: {
      columnName: "memo",
      label: "メモ",
    },
  },
  bankCsv: {
    date: {
      columnName: "date",
      label: "日付",
    },
    income: {
      columnName: "income",
      label: "収入",
    },
    outcome: {
      columnName: "outcome",
      label: "支出",
    },
    memo: {
      columnName: "memo",
      label: "メモ",
    },
  },
};
