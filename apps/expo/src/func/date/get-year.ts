export const getYear = (paramDate?: Date) => {
  const baseDate = paramDate ?? new Date();

  const year = baseDate.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1, 9);
  const lastDayOfYear = new Date(year, 12, 0, 9);
  const lastYear = new Date(year - 1, 0, 1, 9);
  // 本日と年末を比較して、小さい方を返す
  const lastDateNotGreaterThanToday = new Date(
    Math.min(lastDayOfYear.getTime(), baseDate.getTime()),
  );
  lastDateNotGreaterThanToday.setHours(9, 0, 0, 0);

  return {
    year,
    firstDayOfYear,
    lastDayOfYear,
    lastYear,
    lastDateNotGreaterThanToday,
  };
};
