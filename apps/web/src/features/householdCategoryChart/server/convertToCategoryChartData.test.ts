import {
  // eslint-disable-next-line import-access/jsdoc
  aggregateCategoryData,
  convertToCategoryChartData,
} from "./convertToCategoryChartData";

const dummyData = {
  __typename: "HouseholdAllDetailView" as const,
  id: null,
  type: null,
  withdrawalDate: null,
  memo: null,
  account: null,
  freeeLinkDetails: [],
};

describe("convertToCategoryChartData", () => {
  test("期待通りに処理されること", () => {
    const params: Parameters<typeof convertToCategoryChartData>[0] = {
      detailView: [
        {
          ...dummyData,
          settlementDate: "2023-08-01",
          iocomeType: "OUTCOME",
          amount: 100,
          category: {
            id: "c1",
            name: "カテゴリ1",
            depositCategory: null,
          },
          genre: {
            id: "g1",
            name: "ジャンル1",
            genreType: "FIXED",
          },
          tags: [],
        },
        {
          ...dummyData,
          settlementDate: "2023-08-02",
          iocomeType: "OUTCOME",
          amount: 50,
          category: {
            id: "c1",
            name: "カテゴリ1",
            depositCategory: null,
          },
          genre: {
            id: "g1",
            name: "ジャンル1",
            genreType: "FIXED",
          },
          tags: [],
        },
        {
          ...dummyData,
          settlementDate: "2023-08-03",
          iocomeType: "INCOME",
          amount: 50,
          category: {
            id: "c2",
            name: "カテゴリ2",
            depositCategory: null,
          },
          genre: {
            id: "g2",
            name: "ジャンル2",
            genreType: "FLUCTUATION",
          },
          tags: [],
        },
        {
          ...dummyData,
          settlementDate: "2023-09-01",
          iocomeType: "OUTCOME",
          amount: 100,
          category: {
            id: "c1",
            name: "カテゴリ1",
            depositCategory: null,
          },
          genre: {
            id: "g1",
            name: "ジャンル1",
            genreType: "FIXED",
          },
          tags: [],
        },
        {
          ...dummyData,
          settlementDate: "2023-09-02",
          iocomeType: "OUTCOME",
          amount: 300,
          category: {
            id: "c1",
            name: "カテゴリ1",
            depositCategory: null,
          },
          genre: {
            id: "g1",
            name: "ジャンル1",
            genreType: "FIXED",
          },
          tags: [],
        },
      ],
      transferCategory: {
        __typename: "HouseholdTransferCategory",
        id: "g1",
        incomeCategoryId: "c2",
        outcomeCategoryId: "c3",
      },
    };

    const actual = aggregateCategoryData(params);
    const actual2 = convertToCategoryChartData(params);

    expect(actual).toEqual({
      "c1__2023-08": {
        categoryId: "c1",
        categoryName: "カテゴリ1",
        genreName: "ジャンル1",
        iocomeType: "OUTCOME",
        genreType: "FIXED",
        isTransfer: false,
        yearMonth: "2023-08",
        total: 150,
      },
      "c2__2023-08": {
        categoryId: "c2",
        categoryName: "カテゴリ2",
        genreName: "ジャンル2",
        iocomeType: "INCOME",
        genreType: "FLUCTUATION",
        isTransfer: true,
        yearMonth: "2023-08",
        total: 50,
      },
      "c1__2023-09": {
        categoryId: "c1",
        categoryName: "カテゴリ1",
        genreName: "ジャンル1",
        iocomeType: "OUTCOME",
        genreType: "FIXED",
        isTransfer: false,
        yearMonth: "2023-09",
        total: 400,
      },
    });

    expect(actual2).toEqual({
      c1: {
        categoryName: "カテゴリ1",
        genreName: "ジャンル1",
        iocomeType: "OUTCOME",
        genreType: "FIXED",
        isTransfer: false,
        monthlyTotal: {
          "2023-08": 150,
          "2023-09": 400,
        },
      },
      c2: {
        categoryName: "カテゴリ2",
        genreName: "ジャンル2",
        iocomeType: "INCOME",
        genreType: "FLUCTUATION",
        isTransfer: true,
        monthlyTotal: {
          "2023-08": 50,
        },
      },
    });
  });
});
