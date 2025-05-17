import { sumBalanceData } from "./sumBalanceData";

const dummyData = {
  __typename: "HouseholdAllDetailView" as const,
  type: null,
  settlementDate: null,
  memo: null,
  account: null,
  genre: null,
  category: null,
  freeeLinkDetails: [],
};

describe("sumBalanceData", () => {
  test("期待通りに処理されること", () => {
    const params: Parameters<typeof sumBalanceData>[0] = {
      detailView: [
        {
          ...dummyData,
          id: "1",
          withdrawalDate: "2023-08-01",
          iocomeType: "INCOME",
          amount: 100,
          tags: [],
        },
        {
          ...dummyData,
          id: "2",
          withdrawalDate: "2023-08-02",
          iocomeType: "OUTCOME",
          amount: 50,
          tags: [],
        },
        {
          ...dummyData,
          id: "3",
          withdrawalDate: "2023-08-03",
          iocomeType: "INCOME",
          amount: 200,
          tags: [],
        },
        {
          ...dummyData,
          id: "4",
          withdrawalDate: "2023-09-01",
          iocomeType: "OUTCOME",
          amount: 100,
          tags: [],
        },
        {
          ...dummyData,
          id: "5",
          withdrawalDate: "2023-09-02",
          iocomeType: "INCOME",
          amount: 300,
          tags: [],
        },
        {
          ...dummyData,
          id: "6",
          withdrawalDate: "2023-09-03",
          iocomeType: "OUTCOME",
          amount: 150,
          category: {
            id: "dep1",
            name: "dep1",
            depositCategory: {
              id: "on",
            },
          },
          tags: [],
        },
      ],
      transferCategory: null,
    };

    const actual = sumBalanceData(params);

    expect(actual).toEqual({
      "2023-08": {
        income: 300,
        outcome: 50,
        deposit: 0,
        diff: 250,
      },
      "2023-09": {
        income: 300,
        outcome: 100,
        deposit: 150,
        diff: 50,
      },
    });
  });
});
