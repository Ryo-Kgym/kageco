"use client";

import { useState } from "react";

import { IocomeTotal } from "../../../components/molecules/Total";
import { Tag } from "../../../components/ui/tag/Tag";
import { DataTable } from "../../../components/ui/v4/table";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { colors } from "../../../styles/colors";
import { CreditCardDetailEditModal } from "../../householdCreditDetailEdit/components/credit-card-detail-edit-model";
import { DailyDetailEditModal } from "../../householdModifyDailyDetail/components/DailyDetailEditModal";
import type { ChartDetailTableRow } from "../types/chartDetailTableRow";

export const ChartDetailTableClient = ({
  records,
  incomeTotal,
  outcomeTotal,
}: {
  records: ChartDetailTableRow[];
  incomeTotal: number;
  outcomeTotal: number;
}) => {
  const [detail, setDetail] = useState<
    { id: string; type: "daily" | "credit" } | undefined
  >(undefined);

  return (
    <>
      <DataTable
        columns={[
          { accessor: "withdrawalDate", title: "引落日", width: "100" },
          { accessor: "settlementDate", title: "決済日", width: "100" },
          { accessor: "iocomeType", hidden: true },
          {
            accessor: "amount",
            title: "金額",
            textAlign: "right",
            width: "100",
            render: ({ iocomeType, amount, isDeposit }) => {
              const style = (() => {
                if (isDeposit)
                  return {
                    backgroundColor: colors.balance.deposit,
                  };
                switch (iocomeType) {
                  case IocomeType.Income:
                    return {
                      color: colors.balance.income,
                    };
                  case IocomeType.Outcome:
                    return {
                      color: colors.balance.outcome,
                    };
                }
              })();

              return <div style={style}>{amount.toLocaleString()}</div>;
            },
          },
          { accessor: "accountName", title: "アカウント" },
          { accessor: "genreName", title: "ジャンル" },
          { accessor: "categoryName", title: "カテゴリ" },
          {
            accessor: "memo",
            title: "メモ",
            render: ({ memo, tags }) => {
              return (
                <div>
                  {tags.map((tag) => (
                    <Tag
                      key={tag.value}
                      label={tag.label}
                      colorCode={tag.colorCode}
                    />
                  ))}
                  {memo}
                </div>
              );
            },
          },
          { accessor: "tags", title: "タグ", hidden: true },
          { accessor: "isDeposit", hidden: true },
        ]}
        records={records}
        height="45vh"
        recordsPerPage={200}
        onRowClick={(record) => {
          if (record.type === "credit_card") {
            setDetail({
              type: "credit",
              id: record.id,
            });
            return;
          }

          setDetail({
            type: "daily",
            id: record.id,
          });
        }}
      />
      <div>
        <IocomeTotal income={incomeTotal} outcome={outcomeTotal} />
      </div>
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
