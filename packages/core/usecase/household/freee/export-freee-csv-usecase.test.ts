import { describe, expect, test } from "vitest";
import { ExportFreeeCsvUsecase } from "./export-freee-csv-usecase";

describe("ExportFreeeCsvUsecase", () => {
  test("should return empty rows when called", () => {
    const usecase = new ExportFreeeCsvUsecase();
    const input = {
      categoryIds: ["category1", "category2"],
      accountIds: ["account1", "account2"],
      tags: ["tag1", "tag2"],
    };

    return usecase.handle(input).then((result) => {
      expect(result).toEqual({ rows: [] });
    });
  });
});
