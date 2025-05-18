import type { DetailType } from "./detail-type";
import { getBgColor } from "./get-bg-color";

describe("getBgColor", () => {
  const testData: {
    type: DetailType | undefined;
    expected: string;
  }[] = [
    { type: "daily", expected: "bg-blue-50" },
    { type: "creditCardDetail", expected: "bg-yellow-50" },
    { type: "creditCardSummary", expected: "bg-yellow-50" },
    { type: undefined, expected: "" },
  ];

  it.each(testData)(
    "$type のとき、$expected が返る。",
    ({ type, expected }) => {
      expect(getBgColor(type)).toBe(expected);
    },
  );
});
