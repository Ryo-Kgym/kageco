"use client";

import { ActionIcon, Group, Popover, TextInput } from "@mantine/core";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useState } from "react";
import type { FilterState } from "../hooks/useTableFilter";

type TableFilterProps = {
  columnKey: string;
  filterValues: FilterState;
  onFilterChange: (key: string, value: string) => void;
  onClearFilter: (key: string) => void;
};

export function TableFilter({
  columnKey,
  filterValues,
  onFilterChange,
  onClearFilter,
}: TableFilterProps) {
  const [opened, setOpened] = useState(false);
  const currentValue = filterValues[columnKey] || "";
  const hasFilter = !!currentValue;

  const handleInputChange = (value: string) => {
    onFilterChange(columnKey, value);
  };

  const handleClear = () => {
    onClearFilter(columnKey);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon
          variant={hasFilter ? "filled" : "subtle"}
          color={hasFilter ? "blue" : "gray"}
          onClick={() => setOpened((o) => !o)}
          aria-label="Filter"
          size="sm"
        >
          <IconFilter size={16} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <TextInput
            placeholder="フィルター"
            value={currentValue}
            onChange={(event) => handleInputChange(event.currentTarget.value)}
            rightSection={
              hasFilter ? (
                <ActionIcon onClick={handleClear} size="sm" variant="subtle">
                  <IconX size={14} />
                </ActionIcon>
              ) : null
            }
            size="xs"
            w={200}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
