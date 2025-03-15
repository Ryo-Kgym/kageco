"use client";

import { Group, Text } from "@mantine/core";
import type { ReactNode } from "react";
import type { FilterState } from "../hooks/useTableFilter";
import { TableFilter } from "./TableFilter";

type TableHeaderProps = {
  title: ReactNode;
  accessor: string;
  filterValues: FilterState;
  onFilterChange: (key: string, value: string) => void;
  onClearFilter: (key: string) => void;
};

export function TableHeader({
  title,
  accessor,
  filterValues,
  onFilterChange,
  onClearFilter,
}: TableHeaderProps) {
  return (
    <Group gap="xs" wrap="nowrap">
      <Text size="sm" fw={500}>
        {title}
      </Text>
      <TableFilter
        columnKey={accessor}
        filterValues={filterValues}
        onFilterChange={onFilterChange}
        onClearFilter={onClearFilter}
      />
    </Group>
  );
}
