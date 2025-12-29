/** @deprecated {@link DataTable} を使用してください。 */
export { TableContainer as Table } from "./TableContainer";

/** @deprecated {@link DataTable} を使用してください。 */
export type TableProps = {
  keyPrefix: string;
  columns: ColumnProps[];
  onClick?: () => void;
};

/** @deprecated {@link DataTable} を使用してください。 */
export type ColumnProps = {
  value: React.ReactNode | string | number;
  align?: "left" | "right" | "center";
  hidden?: boolean;
};
