"use client";

import { type FC, useState } from "react";

import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { TagGroup } from "../../../components/ui/tag/TagGroup";
import { DataTable } from "../../../components/ui/v4/table";
import { CreditCardDetailEditModal } from "../../householdCreditDetailEdit/components/CreditCardDetailEditModel";
import { DailyDetailEditModal } from "../../householdModifyDailyDetail/components/DailyDetailEditModal";
import type { SearchRow } from "../types/searchRow";

type Props = {
  records: SearchRow[];
};

export const SearchListTable: FC<Props> = ({ records }) => {
  const [detail, setDetail] = useState<
    { id: string; type: "daily" | "credit" } | undefined
  >(undefined);

  return (
    <>
      <DataTable
        columns={[
          { accessor: "settlementDate", title: "決済日", width: 120 },
          { accessor: "withdrawalDate", title: "引落日", width: 120 },
          {
            accessor: "amount",
            title: "金額",
            textAlign: "right",
            width: 100,
            render: (record) => {
              return (
                <FormatPrice
                  iocomeType={record.iocomeType}
                  price={record.amount}
                />
              );
            },
          },
          { accessor: "genreName", title: "ジャンル" },
          { accessor: "categoryName", title: "カテゴリ" },
          { accessor: "accountName", title: "口座" },
          {
            accessor: "memo",
            title: "メモ",
            render: (record) => {
              return (
                <>
                  <TagGroup tags={record.tags} />
                  {record.memo}
                </>
              );
            },
          },
        ]}
        records={records.map((r) => ({
          id: r.id,
          type: r.type,
          settlementDate: r.settlementDate,
          withdrawalDate: r.withdrawalDate,
          amount: r.amount,
          genreName: r.genre.name,
          iocomeType: r.genre.iocomeType,
          categoryName: r.category.name,
          accountName: r.account.name,
          memo: r.memo,
          tags: r.tags
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((tag) => ({
              id: tag.id,
              label: tag.name,
              colorCode: tag.colorCode,
            })),
        }))}
        recordsPerPage={200}
        onRowClick={(detail) => {
          if (detail.type === "credit_card") {
            setDetail({
              type: "credit",
              id: detail.id,
            });
            return;
          }

          setDetail({
            type: "daily",
            id: detail.id,
          });
        }}
      />
      {detail && detail.type === "daily" && (
        <DailyDetailEditModal
          id={detail.id}
          isOpen={!!detail}
          onCloseHandler={() => setDetail(undefined)}
        />
      )}
      {detail && detail.type === "credit" && (
        <CreditCardDetailEditModal
          id={detail.id}
          isOpen={!!detail}
          onCloseHandler={() => setDetail(undefined)}
        />
      )}
    </>
  );
};
