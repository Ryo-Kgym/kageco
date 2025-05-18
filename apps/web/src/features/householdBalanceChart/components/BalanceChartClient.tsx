"use client";

import type { FC } from "react";

import { convertToYmd } from "@/util/date/convertToYmd";
import { RangeMonthPicker } from "../../../components/ui/v5/date/RangeMonthPicker";
import { useNavigation } from "../../../routing/client/useNavigation";
import { BalanceChart } from "./BalanceChart";

type Props = Pick<
  Parameters<typeof BalanceChart>[0],
  "data" | "barchartSetting" | "areaChartSetting"
> & {
  fromDate: Date;
  toDate: Date;
};

export const BalanceChartClient: FC<Props> = ({
  data,
  barchartSetting,
  areaChartSetting,
  fromDate: defaultFromDate,
  toDate: defaultToDate,
}) => {
  const { prependParamAndPush } = useNavigation();

  return (
    <div
      style={{
        height: "100%",
      }}
      className="space-y-5"
    >
      <div className={"w-96"}>
        <RangeMonthPicker
          onChange={async ([fromDate, toDate]) => {
            prependParamAndPush({
              fromDate: convertToYmd(fromDate ?? defaultFromDate),
              toDate: convertToYmd(toDate ?? defaultToDate),
            });
          }}
          label={"期間"}
          defaultValue={[defaultFromDate, defaultToDate]}
        />
      </div>
      <BalanceChart
        data={data}
        barchartSetting={barchartSetting}
        areaChartSetting={areaChartSetting}
        onClick={(event) => {
          if (!event.activeLabel) {
            return;
          }
          prependParamAndPush({
            watch: event.activeLabel,
            dateType: "withdrawalDate",
          });
        }}
      />
    </div>
  );
};
