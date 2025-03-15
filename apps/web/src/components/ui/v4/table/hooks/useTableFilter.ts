"use client";

import { useState, useCallback, useMemo } from "react";

export type FilterState = Record<string, string>;

export function useTableFilter<R extends object>(
  records: ({ id: string } & R)[],
) {
  const [filterValues, setFilterValues] = useState<FilterState>({});

  const updateFilter = useCallback((key: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilterValues((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterValues({});
  }, []);

  const filteredRecords = useMemo(() => {
    if (Object.keys(filterValues).length === 0) {
      return records;
    }

    return records.filter((record) => {
      return Object.entries(filterValues).every(([key, filterValue]) => {
        if (!filterValue) return true;
        
        const recordValue = record[key as keyof R];
        if (recordValue === undefined || recordValue === null) return false;
        
        const stringValue = String(recordValue).toLowerCase();
        return stringValue.includes(filterValue.toLowerCase());
      });
    });
  }, [records, filterValues]);

  return {
    filterValues,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filteredRecords,
  };
}
