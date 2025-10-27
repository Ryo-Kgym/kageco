export const paths = {
  app: "/",
  household: {
    dashboard: "/household/dashboard" as "/",
    account: "/household/account" as "/",
    calendar: ({ date }: { date: Date }) =>
      `/household/calendar/${date.toISOString().slice(0, 10)}` as "/",
    registerDaily: "/household/register" as "/",
    daily: ({ id }: { id: string }) => `/household/detail/daily/${id}` as "/",
    creditCardDetail: ({ id }: { id: string }) =>
      `/household/detail/creditCard/${id}/edit` as "/",
    detailListByAccount: ({ accountId }: { accountId: string }) =>
      `/household/detailList/account/${accountId}` as "/",
    detailListByCreditCardSummary: ({ summaryId }: { summaryId: string }) =>
      `/household/detailList/creditCardSummary/${summaryId}` as "/",
    detailListByFavoriteFilter: ({
      filterId,
      name,
    }: {
      filterId: string;
      name: string;
    }) =>
      `/household/detailList/favoriteFilter/${filterId}?name=${name}` as "/",
    categoryRanking: ({ date }: { date: Date }) =>
      `/household/detailList/categoryRanking/${date
        .toISOString()
        .slice(0, 10)}` as "/",
    rankCategoryYearly: ({ date }: { date: Date }) =>
      `/household/rank/category/yearly/${date
        .toISOString()
        .slice(0, 10)}` as "/",
    detailListByCategory: ({
      year,
      categoryId,
    }: {
      year: Date;
      categoryId: string;
    }) =>
      `/household/rank/category/yearly/${year
        .toISOString()
        .slice(0, 10)}/${categoryId}` as "/",
    setting: {
      root: "/household/setting" as "/",
      dashboard: "/household/setting/dashboard" as "/",
      dashboardEdit: ({ id }: { id: string }) =>
        `/household/setting/dashboard/edit/${id}` as "/",
      favoriteFilter: "/household/setting/favoriteFilter" as "/",
      favoriteFilterDetail: ({ id, name }: { id: string; name: string }) =>
        `/household/setting/favoriteFilter/detail?id=${id}&name=${name}` as "/",
    },
  },
  business: {
    timecard: "/business/timecard" as "/",
  },
  api: {
    business: {
      attendOrLeaveWork: {
        post: () => `${API_ROOT}/business/attendOrLeaveWork`,
        get: ({
          baseDate,
          userId,
          groupId,
        }: { baseDate: string; userId: string; groupId: string }) =>
          `${API_ROOT}/business/attendOrLeaveWork?baseDate=${baseDate}&userId=${userId}&groupId=${groupId}`,
      },
      fixAttendLog: {
        post: () => `${API_ROOT}/business/fixAttendLog`,
      },
      monthlyPlan: {
        post: () => `${API_ROOT}/business/monthlyPlan`,
        get: ({ userId, yearMonth }: { userId: string; yearMonth: string }) =>
          `${API_ROOT}/business/monthlyPlan?userId=${userId}&yearMonth=${yearMonth}`,
      },
    },
  },
} as const;

const API_ROOT = `${process.env.EXPO_PUBLIC_NEXT_API_ENDPOINT_ROOT ?? ""}/api`;
