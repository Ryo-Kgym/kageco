"use client";

import { type FC, useState } from "react";

import { ComboBox } from "../../../components/ui/v4/comboBox";
import { RangeMonthPicker } from "../../../components/ui/v5/date/RangeMonthPicker";
import { useNavigation } from "../../../routing/client/useNavigation";
import { colors } from "../../../styles/colors";
import type { CategoryChartData } from "../types";
import { CategoryChart } from "./CategoryChart";
import type { YearMonth } from "./types";

type Props = {
  fromDate: Date;
  toDate: Date;
  categoryChartData: CategoryChartData;
  comboBoxData: Parameters<typeof ComboBox>[0]["data"];
  defaultCategoryIds: string[];
};

export const CategoryChartClient: FC<Props> = ({
  fromDate: defaultFromDate,
  toDate: defaultToDate,
  categoryChartData,
  comboBoxData,
  defaultCategoryIds,
}) => {
  const { prependParamAndPush } = useNavigation();

  const [categories, setCategories] = useState<string[]>(defaultCategoryIds);

  const makeChartData = (): Record<YearMonth, Record<string, number>> => {
    const data: Record<YearMonth, Record<string, number>> = {};

    const date = new Date(defaultFromDate);
    while (date <= defaultToDate) {
      const key = date.toISOString().slice(0, 7) as YearMonth;
      data[key] = Object.fromEntries(
        categories.map((category) => [
          categoryChartData[category]?.categoryName,
          categoryChartData[category]?.monthlyTotal[key] ?? 0,
        ]),
      );
      date.setMonth(date.getMonth() + 1);
    }

    return data;
  };

  return (
    <div
      style={{
        height: "100%",
      }}
      className="flex flex-row"
    >
      <div className={"w-96"}>
        <RangeMonthPicker
          onChange={async ([fromDate, toDate]) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            prependParamAndPush({
              fromDate: (fromDate ?? defaultFromDate).toLocaleDateString("sv-SE"),
              toDate: (toDate ?? defaultToDate).toLocaleDateString("sv-SE"),
            });
          }}
          label={"期間"}
          defaultValue={[defaultFromDate, defaultToDate]}
        />
        <ComboBox
          value={categories}
          setValue={setCategories}
          data={comboBoxData}
          label={"カテゴリ"}
        />
      </div>
      <CategoryChart
        categories={categories.map((categoryId, index) => ({
          categoryId,
          categoryName: categoryChartData[categoryId]?.categoryName ?? "unknown",
          color: colors.random(index),
        }))}
        data={makeChartData()}
        onClick={(event) => {
          if (!event.activeLabel) {
            return;
          }
          prependParamAndPush({
            watch: event.activeLabel,
            dateType: "settlementDate",
          });
        }}
      />
    </div>
  );
};
