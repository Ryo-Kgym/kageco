import { YYYYmmDD } from "@/util/date/date";
import { z } from "zod";

import { convertToYmd } from "@/util/date/convertToYmd";
import type { DashboardComponentProps } from "../types/dashboardFC";

export const buildParams = (
  params: Pick<DashboardComponentProps, "dashboardSettingArgs"> & {
    targetMonth?: Date;
  },
) => {
  const month = monthSchema.parse(
    Number(params.dashboardSettingArgs.find((arg) => arg.type === "month")?.value),
  );

  const targetMonth = params.targetMonth ?? new Date();
  targetMonth.setMonth(targetMonth.getMonth() + month);

  const firstDay = new YYYYmmDD(
    convertToYmd(new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1)),
  );
  const lastDay = new YYYYmmDD(
    convertToYmd(new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0)),
  );

  return {
    firstDay,
    lastDay,
  };
};

const monthSchema = z.number();
