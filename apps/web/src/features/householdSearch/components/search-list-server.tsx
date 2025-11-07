import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";
import type { FC } from "react";

import { IocomeTotal } from "../../../components/molecules/Total";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { findAccountIds } from "../../../persistence/browser/server/findAccountIds";
import { findCategoryIds } from "../../../persistence/browser/server/findCategoryIds";
import { fetchDetails } from "../server/fetchDetails";
import { SearchListTable } from "./search-list-table";

type Props = {
  fromDate: YYYY_MM_DD;
  toDate: YYYY_MM_DD;
  tagIds: string[];
  categoryIdsFromUrl?: string[];
};

export const SearchListServer: FC<Props> = async ({
  fromDate,
  toDate,
  tagIds,
  categoryIdsFromUrl = [],
}) => {
  // URLのクエリパラメータにcategoryIdsが存在する場合はそれを優先して使用
  const categoryIds = categoryIdsFromUrl.length > 0 ? categoryIdsFromUrl : await findCategoryIds();
  const accountIds = await findAccountIds();

  const { records } = await fetchDetails({
    fromDate: new YYYYmmDD(fromDate),
    toDate: new YYYYmmDD(toDate),
    tagIds,
    accountIds,
    categoryIds,
  });

  const { income, outcome } = {
    income:
      records
        .filter((d) => d.genre.iocomeType === IocomeType.Income)
        .reduce((acc, cur) => acc + cur.amount, 0) ?? 0,
    outcome:
      records
        .filter((d) => d.genre.iocomeType === IocomeType.Outcome)
        .reduce((acc, cur) => acc + cur.amount, 0) ?? 0,
  };

  return (
    <>
      <SearchListTable records={records} />
      <IocomeTotal income={income} outcome={outcome} />
    </>
  );
};
