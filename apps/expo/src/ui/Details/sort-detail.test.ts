import type { Detail } from "~/ui";
import { sortBy } from "./sort-detail";

describe("sortBy.date.asc", () => {
  it("a.date が undefined の場合、0を返す。", () => {
    expect(sortBy.date.asc(testData(undefined), testData("2024-01-03"))).toBe(0);
  });
  it("b.date が undefined の場合、0を返す。", () => {
    expect(sortBy.date.asc(testData("2024-01-03"), testData(undefined))).toBe(0);
  });
  it("a > b の場合、1を返す。", () => {
    expect(sortBy.date.asc(testData("2024-01-03"), testData("2024-01-02"))).toBe(1);
  });
  it("a < b の場合、-1を返す。", () => {
    expect(sortBy.date.asc(testData("2024-01-01"), testData("2024-01-02"))).toBe(-1);
  });
  it("a === b の場合、0を返す。", () => {
    expect(sortBy.date.asc(testData("2024-01-02"), testData("2024-01-02"))).toBe(0);
  });
  // desc は asc の逆順なので、テストは省略。
});

const testData = (date: string | undefined): Detail => ({
  id: "2",
  date: date ? new Date(date) : undefined,
  accountName: "accountName",
  amount: 1,
  categoryName: "categoryName",
  genreName: "genreName",
  iocomeType: "INCOME",
  redirectHandler: () => undefined,
  memo: "memo",
});
