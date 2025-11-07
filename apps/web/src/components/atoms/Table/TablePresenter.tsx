import { ScrollArea, Table } from "@mantine/core";
import type { RefObject } from "react";

type TablePresenterProps = {
  headerTr: React.ReactNode;
  tbody: React.ReactNode;
  tfoot?: React.ReactNode;
  height: string;
  fontSize: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  viewport: RefObject<HTMLDivElement | null>;
  scrollToBottom?: () => void;
  toButtonOpen: boolean;
  onMouseMoveHandler: () => void;
  onMouseOutHandler: () => void;
};
export const TablePresenter = ({
  headerTr,
  tbody,
  tfoot,
  height,
  fontSize,
  horizontalSpacing,
  verticalSpacing,
  viewport,
  onMouseMoveHandler,
  onMouseOutHandler,
}: TablePresenterProps) => (
  <>
    <ScrollArea
      viewportRef={viewport}
      onMouseOver={onMouseMoveHandler}
      onMouseOut={onMouseOutHandler}
      h={height}
    >
      <Table
        striped
        highlightOnHover
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        withColumnBorders
        className={`bg-slate-100 sm:table-fixed text-[${fontSize}px]`}
        stickyHeader
        stickyHeaderOffset={0}
      >
        <Table.Thead className={"top-0 bg-white"}>{headerTr}</Table.Thead>
        <Table.Tbody>{tbody}</Table.Tbody>
        {tfoot && <Table.Tfoot className={"sticky bottom-0 bg-white"}>{tfoot}</Table.Tfoot>}
      </Table>
    </ScrollArea>
  </>
);
