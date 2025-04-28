import type { YYYY_MM_DD, YYYYmmDD } from "@/type/date/date";
import type { FragAllDetailViewFragment } from "@v3/graphql/household/schema/query/v5/fragChartDetailTable.generated";
import { GetAllDetailViewDocument } from "@v3/graphql/household/schema/query/v5/getAllDetailView.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { UnifiedRecord } from "../types/unified-record";

type Params = {
  fromDate: YYYYmmDD;
  toDate: YYYYmmDD;
  tagIds: string[];
  accountIds: string[];
  categoryIds: string[];
};

export const fetchFreeeRecords = async (params: Params) => {
  const { group } = await findUser();

  const { data } = await execQuery(GetAllDetailViewDocument, {
    groupId: group.id,
    fromDate: params.fromDate.toString(),
    toDate: params.toDate.toString(),
    tagIds: params.tagIds,
    accountIds: params.accountIds,
    categoryIds: params.categoryIds,
  });

  if (!data?.group) {
    return {
      records: [],
    };
  }

  let details: FragAllDetailViewFragment[] = [];

  if (params.tagIds.length > 0) {
    const duplicatedDetails = data.group.tags.flatMap((tag) =>
      tag.detailTags.flatMap((dt) => dt.details),
    );
    const uniqueIds = Array.from(new Set(duplicatedDetails.map((d) => d.id)));
    details = uniqueIds
      .map((id) => duplicatedDetails.find((d) => d.id === id))
      .filter((d): d is FragAllDetailViewFragment => !!d);
  } else {
    details = data.group.details;
  }

  // 取得したデータをFreeeRegisterFormで使用できる形式に変換
  const unifiedRecords: UnifiedRecord[] = details.map((detail, index) => ({
    id: `record-${index + 1}`,
    // 基本情報
    issueDate: detail.settlementDate as YYYY_MM_DD,
    type: detail.iocomeType === "INCOME" ? "income" : "expense",
    companyId: "",
    dueDate: "",
    partnerId: "",
    partnerCode: "",
    refNumber: "",
    // 明細情報
    taxCode: "",
    accountItemId: "",
    amount: detail.amount?.toString() || "",
    itemId: "",
    sectionId: "",
    tagIds: detail.tags.map((tag) => tag.tag.id),
    description: detail.memo || "",
    vat: "",
    // 支払情報
    paymentAmount: detail.amount?.toString() || "",
    fromWalletableId: "",
    fromWalletableType: "bank_account",
    paymentDate: detail.withdrawalDate as YYYY_MM_DD,
    // 領収書ID
    receiptId: "",
  }));

  return {
    records: unifiedRecords,
  };
};
