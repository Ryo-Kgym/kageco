"use client";

import type { MantineSize } from "@mantine/core";
import { Button, Modal, Text, TextInput } from "@mantine/core";
import { type JSX, useState } from "react";

import styles from "./ModalTableSelect.module.scss";
import type { SelectData } from "./index";

type Props = {
  label: string;
  value: string | null;
  onChange: (_: string) => void;
  data: SelectData[];
  placeholder?: string;
  maxDropdownHeight?: number;
  size?: MantineSize;
  withAsterisk?: boolean;
  disabled?: boolean;
  gridColumns?: number;
};

export const ModalTableSelect = ({
  label,
  value,
  onChange,
  data,
  placeholder = "",
  maxDropdownHeight = 200,
  size = "xl",
  withAsterisk = false,
  disabled = false,
  gridColumns = 3,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const valueIsInvalid = value === null || value?.length === 0;
  const error = withAsterisk && valueIsInvalid ? "Required" : "";

  // Find the selected item's label to display in the input
  const selectedItem = data.find((item) => {
    if ("value" in item) {
      return item.value === value;
    }
    if ("items" in item) {
      return item.items.some((subItem) => {
        if (typeof subItem === "string") {
          return subItem === value;
        }
        return subItem.value === value;
      });
    }
    return false;
  });

  let displayValue = "";
  if (selectedItem) {
    if ("label" in selectedItem) {
      displayValue = selectedItem.label;
    } else if ("items" in selectedItem) {
      const foundItem = selectedItem.items.find((subItem) => {
        if (typeof subItem === "string") {
          return subItem === value;
        }
        return subItem.value === value;
      });

      if (foundItem) {
        if (typeof foundItem === "string") {
          displayValue = foundItem;
        } else if ("label" in foundItem) {
          displayValue = foundItem.label;
        }
      }
    }
  }

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpened(false);
  };

  // Calculate total number of items for dynamic height
  const calculateTotalItems = () => {
    const filteredData = getFilteredData();
    let count = 0;
    filteredData.forEach((item) => {
      if ("value" in item) {
        count += 1;
      } else if ("items" in item) {
        // Count the group header
        count += 1;
        // Count each item in the group
        count += item.items.length;
      }
    });
    return count;
  };

  // Calculate appropriate height based on number of items
  const calculateModalHeight = () => {
    const totalItems = calculateTotalItems();

    // If there are no items, return a minimal height
    if (totalItems === 0) return 100;

    // Count how many groups we have for additional spacing
    const groupCount = data.filter((item) => "items" in item).length;

    // Estimate height: each item is about 40px, plus some padding
    // Use the gridColumns prop to calculate the number of rows
    const rows = Math.ceil(totalItems / gridColumns);

    // Add extra height for group headers (they take full width)
    const groupHeaderHeight = groupCount * 24; // Extra space for group margins

    // Each row is approximately 40px + 8px gap
    return Math.min(rows * 48 + groupHeaderHeight, maxDropdownHeight);
  };

  // Filter data based on search query
  const getFilteredData = () => {
    if (!searchQuery.trim()) return data;

    return data
      .map((item) => {
        if ("value" in item) {
          // Check if the item label contains the search query
          if (item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
            return item;
          }
          return null;
        }

        if ("items" in item) {
          // Filter group items
          const filteredItems = item.items.filter((subItem) => {
            if (typeof subItem === "string") {
              return subItem.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return subItem.label
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          });

          // Return the group with filtered items if any match
          if (filteredItems.length > 0) {
            return { ...item, items: filteredItems };
          }
          return null;
        }

        return null;
      })
      .filter(Boolean) as SelectData[];
  };

  const renderGridItems = () => {
    const items: JSX.Element[] = [];
    const filteredData = getFilteredData();

    filteredData.forEach((item, index) => {
      if ("value" in item) {
        // ComboboxItem
        items.push(
          <button
            key={item.value}
            onClick={() => !item.disabled && handleSelect(item.value)}
            className={`${styles.gridItem} ${value === item.value ? styles.selected : ""} ${item.disabled ? styles.disabled : ""}`}
            disabled={item.disabled}
            type="button"
          >
            {item.label}
          </button>,
        );
      } else if ("items" in item) {
        // ComboboxItemGroup
        items.push(
          <div
            key={`group-${item.group}`}
            className={`${styles.groupHeader} ${styles.fullWidth}`}
          >
            {item.group}
          </div>,
        );

        item.items.forEach((subItem) => {
          if (typeof subItem === "string") {
            items.push(
              <button
                key={subItem}
                onClick={() => handleSelect(subItem)}
                className={`${styles.gridItem} ${styles.groupItem} ${value === subItem ? styles.selected : ""}`}
                type="button"
              >
                {subItem}
              </button>,
            );
          } else {
            items.push(
              <button
                key={subItem.value}
                onClick={() => !subItem.disabled && handleSelect(subItem.value)}
                className={`${styles.gridItem} ${styles.groupItem} ${value === subItem.value ? styles.selected : ""} ${subItem.disabled ? styles.disabled : ""}`}
                disabled={subItem.disabled}
                type="button"
              >
                {subItem.label}
              </button>,
            );
          }
        });
      }
    });

    return items;
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <Text size={size} component="label" className={styles.label}>
          {label}
          {withAsterisk && <span className={styles.asterisk}>*</span>}
        </Text>
      </div>

      <TextInput
        value={displayValue}
        placeholder={placeholder}
        readOnly
        onClick={() => !disabled && setOpened(true)}
        size={"md"}
        error={error}
        disabled={disabled}
        className={styles.input}
      />

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setSearchQuery("");
        }}
        title={label}
        size={size}
      >
        <div className={styles.searchContainer}>
          <TextInput
            placeholder="検索..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            className={styles.searchInput}
          />
        </div>
        <div
          className={styles.tableContainer}
          style={{ height: `${calculateModalHeight()}px` }}
        >
          <div
            className={styles.gridContainer}
            style={{
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            }}
          >
            {renderGridItems()}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button onClick={() => setOpened(false)}>閉じる</Button>
        </div>
      </Modal>
    </div>
  );
};
