import type { RegisterDealDto } from "@/core/usecase/freee/register-deal-dto";
import { convertToDealData } from "./convert-to-deal-data";

describe("convertToDealData", () => {
  test("正常なレコードが正しく変換されること", () => {
    // テスト用のレコードデータ
    const testRecords = [
      {
        id: "1",
        issueDate: "2023-01-01",
        type: "income",
        companyId: "123",
        dueDate: "2023-01-31",
        partnerId: "456",
        partnerCode: "PARTNER001",
        refNumber: "REF001",
        taxCode: "10",
        accountItemId: "789",
        amount: "1000",
        itemId: "101",
        sectionId: "202",
        tagIds: ["303", "404"],
        description: "テスト取引1",
        vat: "100",
        paymentAmount: "1000",
        fromWalletableId: "505",
        fromWalletableType: "bank_account",
        paymentDate: "2023-01-15",
        receiptId: "606",
      },
      {
        id: "2",
        issueDate: "2023-02-01",
        type: "expense",
        companyId: null,
        dueDate: "2023-02-28",
        partnerId: null,
        partnerCode: "PARTNER002",
        refNumber: "REF002",
        taxCode: null,
        accountItemId: null,
        amount: null,
        itemId: null,
        sectionId: null,
        tagIds: [],
        description: "テスト取引2",
        vat: null,
        paymentAmount: null,
        fromWalletableId: null,
        fromWalletableType: "wallet",
        paymentDate: "2023-02-15",
        receiptId: null,
      },
    ];

    // 関数を実行
    const result = convertToDealData(testRecords);

    // 期待される結果
    const expected: RegisterDealDto[] = [
      {
        issueDate: "2023-01-01",
        type: "income",
        companyId: 123,
        dueDate: "2023-01-31",
        partnerId: 456,
        partnerCode: "PARTNER001",
        refNumber: "REF001",
        details: [
          {
            taxCode: 10,
            accountItemId: 789,
            amount: 1000,
            itemId: 101,
            sectionId: 202,
            tagIds: [303, 404],
            description: "テスト取引1",
            vat: 100,
          },
        ],
        payments: [
          {
            amount: 1000,
            fromWalletableId: 505,
            fromWalletableType: "bank_account",
            date: "2023-01-15",
          },
        ],
        receiptIds: [606],
      },
      {
        issueDate: "2023-02-01",
        type: "expense",
        companyId: null,
        dueDate: "2023-02-28",
        partnerId: null,
        partnerCode: "PARTNER002",
        refNumber: "REF002",
        details: [
          {
            taxCode: null,
            accountItemId: null,
            amount: null,
            itemId: null,
            sectionId: null,
            tagIds: [],
            description: "テスト取引2",
            vat: null,
          },
        ],
        payments: [
          {
            amount: null,
            fromWalletableId: null,
            fromWalletableType: "wallet",
            date: "2023-02-15",
          },
        ],
        receiptIds: [],
      },
    ];

    // 結果を検証
    expect(result).toEqual(expected);
  });

  test("空の配列が渡された場合にエラーがスローされること", () => {
    expect(() => {
      convertToDealData([]);
    }).toThrow("レコードが提供されていません");
  });

  test("nullが渡された場合にエラーがスローされること", () => {
    expect(() => {
      // @ts-expect-error: テスト用に意図的にnullを渡す
      convertToDealData(null);
    }).toThrow("レコードが提供されていません");
  });

  test("数値変換が正しく行われること", () => {
    const testRecord = [
      {
        id: "1",
        issueDate: "2023-01-01",
        type: "income",
        companyId: "123",
        dueDate: "2023-01-31",
        partnerId: "456",
        partnerCode: "PARTNER001",
        refNumber: "REF001",
        taxCode: "10",
        accountItemId: "789",
        amount: "1000",
        itemId: "101",
        sectionId: "202",
        tagIds: ["303", "404", ""],
        description: "テスト取引",
        vat: "100",
        paymentAmount: "1000",
        fromWalletableId: "505",
        fromWalletableType: "bank_account",
        paymentDate: "2023-01-15",
        receiptId: "606",
      },
    ];

    const result = convertToDealData(testRecord);

    // 数値変換の検証
    expect(result[0]?.companyId).toBe(123);
    expect(result[0]?.partnerId).toBe(456);
    expect(result[0]?.details[0]?.taxCode).toBe(10);
    expect(result[0]?.details[0]?.accountItemId).toBe(789);
    expect(result[0]?.details[0]?.amount).toBe(1000);
    expect(result[0]?.details[0]?.itemId).toBe(101);
    expect(result[0]?.details[0]?.sectionId).toBe(202);
    expect(result[0]?.details[0]?.tagIds).toEqual([303, 404]);
    expect(result[0]?.details[0]?.vat).toBe(100);
    expect(result[0]?.payments[0]?.amount).toBe(1000);
    expect(result[0]?.payments[0]?.fromWalletableId).toBe(505);
    expect(result[0]?.receiptIds).toEqual([606]);
  });
});
