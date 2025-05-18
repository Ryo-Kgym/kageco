export const getMonth = (paramDate?: Date) => {
  const baseDate = paramDate ?? new Date();

  const firstDayOfMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    1,
    9,
  );
  const lastDayOfMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + 1,
    0,
    9,
  );

  const lastMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() - 1,
    1,
    9,
  );

  const month = baseDate.getMonth() + 1;

  return {
    firstDayOfMonth,
    lastDayOfMonth,
    month,
    lastMonth,
  };
};
