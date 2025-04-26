"use client";

import { DataTable } from "mantine-datatable";
import { type ReactNode, useEffect, useState } from "react";
import { TableHeader } from "./components/TableHeader";
import { useTableFilter } from "./hooks/useTableFilter";

export type DataTableRowType<R extends object> = { id: string } & R;

export type ColumnProps<R extends object> = {
  accessor: keyof R;
  title?: string;
  width?: number | string;
  textAlign?: "left" | "center" | "right";
  render?: (record: R) => ReactNode;
  hidden?: boolean;
  footer?: ReactNode;
  filterable?: boolean;
};

export type DataTableProps<R extends object> = {
  columns: ColumnProps<R>[];
  records: DataTableRowType<R>[];
  onRowClick?: (record: DataTableRowType<R>) => void;
  onSelect?: (selectedRecords: DataTableRowType<R>[]) => void;
  height?: string;
  recordsPerPage?: number;
};

export const MantineDataTable = <R extends object>({
  columns,
  records: defaultRecords,
  onRowClick,
  onSelect,
  height = "85vh",
  recordsPerPage = 30,
}: DataTableProps<R>) => {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState<DataTableRowType<R>[]>(
    [],
  );
  const {
    filteredRecords: filteredDefaultRecords,
    filterValues,
    updateFilter,
    clearFilter,
  } = useTableFilter<R>(defaultRecords);

  const [records, setRecords] = useState(
    filteredDefaultRecords?.slice(0, recordsPerPage),
  );

  // ページが変更されたとき、またはフィルターが変更されたときにレコードを更新
  useEffect(() => {
    const from = (page - 1) * recordsPerPage;
    const to = from + recordsPerPage;
    setRecords(filteredDefaultRecords?.slice(from, to));
  }, [filteredDefaultRecords, page, recordsPerPage]);

  // フィルターが変更されたときにページを1に戻す
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
  }, [filterValues]);

  // 選択が変更されたときにonSelectコールバックを呼び出す
  useEffect(() => {
    if (onSelect) {
      onSelect(selectedRecords);
    }
  }, [selectedRecords, onSelect]);

  // カラムにヘッダーコンポーネントを追加
  const enhancedColumns = columns.map((column) => {
    // filterable が明示的に false でない限り、フィルター可能とする
    const isFilterable = column.filterable !== false;

    if (isFilterable) {
      return {
        ...column,
        title: (
          <TableHeader
            title={column.title || String(column.accessor)}
            accessor={String(column.accessor)}
            filterValues={filterValues}
            onFilterChange={updateFilter}
            onClearFilter={clearFilter}
          />
        ),
      };
    }

    return column;
  });

  return (
    <DataTable
      height={height}
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={enhancedColumns}
      totalRecords={filteredDefaultRecords?.length ?? 0}
      recordsPerPage={recordsPerPage}
      page={page}
      onPageChange={(p) => setPage(p)}
      paginationSize="md"
      loadingText="読み込み中..."
      noRecordsText="データがありません"
      paginationText={({ from, to, totalRecords }) =>
        `${totalRecords}件中 ${from}〜${to}件を表示`
      }
      paginationActiveBackgroundColor="green"
      paginationActiveTextColor="#e6e348"
      onRowClick={
        onRowClick ? (record) => onRowClick(record.record) : undefined
      }
      rowClassName={
        onRowClick ? "cursor-pointer hover:bg-gray-100" : "hover:bg-gray-100"
      }
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
    />
  );
};
