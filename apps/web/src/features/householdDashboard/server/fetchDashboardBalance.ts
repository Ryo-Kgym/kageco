"use server";

type Results = {
  cash: number;
  investment: number;
  total: number;
  currentDatetime: Date;
};

export const fetchDashboardBalance = async ({
  favoriteFilterId,
}: {
  favoriteFilterId: string;
}): Promise<Results> => {
  favoriteFilterId;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    cash: 100000,
    investment: 0,
    total: 100000,
    currentDatetime: new Date(),
  };
};
