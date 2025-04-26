import type { HouseholdUsecase } from "../HouseholdUsecase";

export class ExportFreeeCsvUsecase
  implements HouseholdUsecase<ExportFreeeCsvInput, ExportFreeeCsvOutput>
{
  async handle(input: ExportFreeeCsvInput): Promise<ExportFreeeCsvOutput> {
    // In a real implementation, this would fetch data from a gateway
    // For now, we'll just return an empty array as specified in the requirements
    return {
      rows: [],
    };
  }
}

export type ExportFreeeCsvInput = {
  categoryIds: string[];
  accountIds: string[];
  tags: string[];
};

export type ExportFreeeCsvOutput = {
  rows: FreeeCsvRow[];
};

export type FreeeCsvRow = {
  // 収支区分
  transactionType: string;
  // 管理番号
  managementNumber: string;
  // 発生日
  occurrenceDate: string;
  // 決済期日
  settlementDueDate: string;
  // 取引先コード
  clientCode: string;
  // 取引先
  client: string;
  // 勘定科目
  accountItem: string;
  // 税区分
  taxCategory: string;
  // 金額
  amount: number;
  // 税計算区分
  taxCalculationType: string;
  // 税額
  taxAmount: number;
  // 備考
  remarks: string;
  // 品目
  item: string;
  // 部門
  department: string;
  // メモタグ（複数指定可、カンマ区切り）
  memoTags: string;
  // セグメント1
  segment1: string;
  // セグメント2
  segment2: string;
  // セグメント3
  segment3: string;
  // 決済日
  settlementDate: string;
  // 決済口座
  settlementAccount: string;
  // 決済金額
  settlementAmount: number;
};
