import { convertToYmd } from "@/core/function/date/convertToYmd";
import { YYYYmmDD } from "@/util/date/date";

import { extractComboBoxData } from "../server/extractComboBoxData";
import { fetchCategoryChartData } from "../server/fetchCategoryChartData";
import { sortByTotal } from "../server/sortByTotal";
import { CategoryChartClient } from "./CategoryChartClient";

const getPast12MonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return new YYYYmmDD(convertToYmd(date));
};

export const CategoryChartServer = async ({
  fromDate = getPast12MonthDate(),
  toDate = new YYYYmmDD(convertToYmd(new Date())),
}: {
  fromDate: YYYYmmDD | undefined;
  toDate: YYYYmmDD | undefined;
}) => {
  const { data } = await fetchCategoryChartData({
    fromDate,
    toDate,
  });

  const comboBoxData = extractComboBoxData(data);
  const defaultCategoryIds = sortByTotal(
    data,
    (() => {
      const date = toDate.parseDate();
      date.setMonth(date.getMonth() - 1);
      return date;
    })(),
  );

  return (
    <CategoryChartClient
      fromDate={fromDate?.parseDate()}
      toDate={toDate?.parseDate()}
      categoryChartData={data}
      comboBoxData={comboBoxData}
      defaultCategoryIds={defaultCategoryIds}
    />
  );
};
