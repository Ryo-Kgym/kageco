import { useRouter } from "expo-router";
import { View } from "react-native";

import { paths } from "~/app/paths";
import { useGetDetails } from "~/hooks/household/detail/useGetDetails";
import { Details, Total } from "~/ui";
import type { DetailType } from "~/ui/Details/detail-type";
import { CalendarPresenter } from "./CalendarPresenter";
import { generateCalendar } from "./generate-calendar";

export const CalendarContainer = ({ baseDate }: { baseDate: Date }) => {
  const { push } = useRouter();
  const today = new Date();

  const calendar = generateCalendar(baseDate);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const fromDate = calendar[0]!;
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const toDate = calendar[calendar.length - 1]!;

  const { getDetailsByDate } = useGetDetails({
    fromDate,
    toDate,
    converter: {
      daily: (detail) => ({
        id: detail.id,
        accountName: detail.account.name,
        amount: detail.amount,
        genreName: detail.genre.name,
        categoryName: detail.category.name,
        iocomeType: detail.genre.iocomeType,
        memo: detail.memo,
        redirectHandler: () => push(paths.household.daily({ id: detail.id })),
        type: "daily" as DetailType,
      }),
      creditCardSummary: (summary) => ({
        id: summary.id,
        accountName: summary.account.name,
        amount: summary.total,
        genreName: summary.genre.name,
        categoryName: summary.category.name,
        iocomeType: summary.genre.iocomeType,
        memo: null,
        redirectHandler: () =>
          push(
            paths.household.detailListByCreditCardSummary({
              summaryId: summary.id,
            }),
          ),
        type: "creditCardSummary" as DetailType,
      }),
    },
  });
  const { details, incomeTotal, outcomeTotal } = getDetailsByDate(baseDate);

  const days = calendar.map((day) => {
    const { incomeTotal, outcomeTotal } = getDetailsByDate(day);
    return {
      date: day,
      isToday: day.toISOString().slice(0, 10) === today.toISOString().slice(0, 10),
      isThisMonth: day.getMonth() === baseDate.getMonth(),
      isSelectedDate: baseDate.toISOString().slice(0, 10) === day.toISOString().slice(0, 10),
      income: incomeTotal,
      outcome: outcomeTotal,
      totalDisabled: incomeTotal === 0 && outcomeTotal === 0,
    };
  });

  const changeHandler = (date: Date) => push(paths.household.calendar({ date }));

  if (!details) {
    return null;
  }

  return (
    <>
      <CalendarPresenter baseDate={baseDate} changeHandler={changeHandler} days={days} />
      <Total income={incomeTotal} outcome={outcomeTotal} />
      <View className={"h-[38vh]"}>
        <Details details={details} />
      </View>
    </>
  );
};
