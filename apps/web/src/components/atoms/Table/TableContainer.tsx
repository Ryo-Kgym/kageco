/*
 * Copyright (c) 2024 Ryo-Kgym.
 */
"use client";

import type { MantineSize } from "@mantine/core";
import { Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { TablePresenter } from "./TablePresenter";
import type { ColumnProps, TableProps } from "./index";

type Props = {
  header: string[];
  tablePropsList: TableProps[];
  footer?: ColumnProps[][];
  height?: string;
  fontSize?: number;
  size?: MantineSize;
  toBottom?: boolean;
  defaultBottom?: boolean;
};
/** @deprecated {@link DataTable} を使用してください。 */
export const TableContainer = ({
  header,
  tablePropsList,
  footer,
  height = "80vh",
  size = "xl",
  toBottom = false,
  defaultBottom = true,
}: Props) => {
  const [toButtonOpen, setToButtonOpen] = useState(false);

  const thead = (
    <Table.Tr>
      {header.map((title, i) => {
        return (
          <Table.Th
            key={`th${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              i
            }`}
          >
            {title}
          </Table.Th>
        );
      })}
    </Table.Tr>
  );

  const generateRow = (
    { keyPrefix, onClick, columns }: TableProps,
    i: number,
  ) => (
    <Table.Tr
      key={keyPrefix + i}
      onClick={onClick ?? (() => undefined)}
      className={onClick ? "cursor-pointer" : ""}
    >
      {columns.map(generateColumn)}
    </Table.Tr>
  );

  const generateColumn = (columnProps: ColumnProps, j: number) => (
    <Table.Td
      key={`td${j}`}
      align={columnProps.align ?? "left"}
      hidden={columnProps.hidden ?? false}
    >
      {columnProps.value}
    </Table.Td>
  );

  const generateFooterRow = (row: ColumnProps[], i: number) => (
    <Table.Tr key={`${tfoot}i}`}>
      {row.map((columnProps: ColumnProps, j: number) => (
        <Table.Td
          key={`td${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            j
          }`}
          align={columnProps.align ?? "left"}
          hidden={columnProps.hidden ?? false}
          className={"border-2 bg-white p-2 font-bold"}
        >
          {columnProps.value}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const tbody = <>{tablePropsList.map(generateRow)}</>;

  const tfoot = footer ? <>{footer.map(generateFooterRow)}</> : undefined;

  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottomHandler = (behavior: ScrollBehavior = "smooth") => {
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior,
    });
  };

  const scrollToBottom = toBottom ? scrollToBottomHandler : undefined;

  const onMouseMoveHandler = () => {
    setToButtonOpen(true);
    setTimeout(() => {
      setToButtonOpen(false);
    }, 2000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (defaultBottom) {
      scrollToBottomHandler("instant");
    }
  }, [defaultBottom, tablePropsList]);

  return (
    <TablePresenter
      headerTr={thead}
      tbody={tbody}
      tfoot={tfoot}
      height={height}
      fontSize={paddingMap[size].fontSize}
      horizontalSpacing={paddingMap[size].horizontalSpacing}
      verticalSpacing={paddingMap[size].verticalSpacing}
      viewport={viewport}
      scrollToBottom={scrollToBottom}
      toButtonOpen={toButtonOpen}
      onMouseMoveHandler={onMouseMoveHandler}
      onMouseOutHandler={() => {
        setToButtonOpen(false);
      }}
    />
  );
};

const paddingMap: Record<
  MantineSize,
  { fontSize: number; horizontalSpacing: number; verticalSpacing: number }
> = {
  xs: { fontSize: 14, horizontalSpacing: 10, verticalSpacing: 10 },
  sm: { fontSize: 18, horizontalSpacing: 15, verticalSpacing: 15 },
  md: { fontSize: 20, horizontalSpacing: 20, verticalSpacing: 20 },
  lg: { fontSize: 23, horizontalSpacing: 25, verticalSpacing: 25 },
  xl: { fontSize: 28, horizontalSpacing: 30, verticalSpacing: 30 },
};
