import { YYYYmmDD } from "@/type/date/date";
import type { FC } from "react";

import { findAccountIds } from "../../../persistence/browser/server/findAccountIds";
import { findCategoryIds } from "../../../persistence/browser/server/findCategoryIds";
import type { YYYY_MM_DD } from "../../../types/yyyyMMdd";
import { fetchFreeeRecords } from "../server/fetch-freee-records";
import { FreeeInsertForm } from "./freee-insert-form";

type Props = {
  fromDate: YYYY_MM_DD;
  toDate: YYYY_MM_DD;
  tagIds: string[];
  categoryIdsFromUrl?: string[];
};

/**
 * freeeへ取引登録するサーバーコンポーネント
 * 指定された期間、タグ、カテゴリに基づいてデータを取得し、FreeeInsertFormに初期値として渡す
 */
export const FreeeInsertServer: FC<Props> = async ({
  fromDate,
  toDate,
  tagIds,
  categoryIdsFromUrl = [],
}) => {
  // URLのクエリパラメータにcategoryIdsが存在する場合はそれを優先して使用
  const categoryIds =
    categoryIdsFromUrl.length > 0
      ? categoryIdsFromUrl
      : await findCategoryIds();
  const accountIds = await findAccountIds();

  const { records } = await fetchFreeeRecords({
    fromDate: new YYYYmmDD(fromDate),
    toDate: new YYYYmmDD(toDate),
    tagIds,
    accountIds,
    categoryIds,
  });

  return <FreeeInsertForm initialRecords={records} />;
};
