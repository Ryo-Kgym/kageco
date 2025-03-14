import { HouseholdForecastClient } from "./HouseholdForecastClient";

export const HouseholdForecastServer = async () => {
  // 将来的には実際のデータをフェッチする処理を追加できます
  // 現在はモックデータを使用します
  const forecastData = {
    currentMonth: {
      income: 350000,
      expense: 280000,
      balance: 70000,
    },
    nextMonth: {
      income: 350000,
      expense: 290000,
      balance: 60000,
    },
    nextThreeMonths: {
      income: 1050000,
      expense: 880000,
      balance: 170000,
    },
    nextSixMonths: {
      income: 2100000,
      expense: 1750000,
      balance: 350000,
    },
  };

  return <HouseholdForecastClient forecastData={forecastData} />;
};
