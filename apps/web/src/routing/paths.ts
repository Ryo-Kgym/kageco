import type { YYYY_MM_DD } from "@/type/date/date";

export const paths = {
  group: {
    select: "/group",
  },
  household: {
    dashboard: "/household/dashboard",
    balanceChart: "/household/chart",
    categoryChart: "/household/chart?type=category",
    forecast: "/household/forecast",
    search: "/household/search",
    account: "/household/account",
    creditCard: "/household/creditCard",
    fileImport: "/household/fileImport",
    setting: {
      genre: "/household/setting/genre",
      category: "/household/setting/category",
      categoryAdd: "/household/setting/category/add",
      tag: "/household/setting/tag",
      template: "/household/setting/template",
      batch: "/household/setting/batch",
    },
    creditDetail: {
      edit: ({
        creditCardSummaryId,
        creditDetailId,
      }: {
        creditCardSummaryId: string;
        creditDetailId: string;
      }) =>
        `/household/creditCard/${creditCardSummaryId}/edit/${creditDetailId}`,
      add: ({ creditCardSummaryId }: { creditCardSummaryId: string }) =>
        `/household/creditCard/${creditCardSummaryId}/add`,
    },
    monthlySummary: {
      root: () => "/household/monthly-summary",
    },
  },
  business: {
    timecard: () => "/business/timecard",
  },
};
