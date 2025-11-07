"use client";

import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";

import { useGetDetailMaster } from "../../../features/householdRegisterDaily/hooks/useDetailMaster";
import { AllSelectButtons } from "./AllSelectButtons";
import type { SelectData } from "./v5";

export const CategoryMultipleSelect = ({
  categoryId,
  onChange,
  disabled,
  nonLabel = false,
}: {
  categoryId: string[];
  onChange: (_: string[]) => void;
  disabled?: boolean;
  nonLabel?: boolean;
}) => {
  const [options, setOptions] = useState<SelectData[]>([]);
  const { getAllCategories } = useGetDetailMaster();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOptions(getAllCategories());
  }, []);

  return (
    <>
      <MultiSelect
        label={nonLabel ? "" : "カテゴリ"}
        value={categoryId}
        onChange={onChange}
        data={options}
        placeholder={"カテゴリを選択してください"}
        withAsterisk
        size={"xs"}
        disabled={disabled}
        multiple
      />
      <AllSelectButtons options={options} onChange={onChange} />
    </>
  );
};
