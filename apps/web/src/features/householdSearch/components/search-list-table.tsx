"use client";

import { type FC, useCallback, useEffect } from "react";
import { useState } from "react";

import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { DraggableModal } from "../../../components/ui/Modal/draggable-modal";
import { TagGroup } from "../../../components/ui/tag/TagGroup";
import { DataTable } from "../../../components/ui/v4/table";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { CreditCardDetailEditModal } from "../../householdCreditDetailEdit/components/credit-card-detail-edit-model";
import { DailyDetailEditModal } from "../../householdModifyDailyDetail/components/daily-detail-edit-modal";
import type { SearchRow } from "../types/searchRow";
import { TotalDisplay } from "./total-display";

type Props = {
  records: SearchRow[];
};

export const SearchListTable: FC<Props> = ({ records }) => {
  const [detail, setDetail] = useState<
    { id: string; type: "daily" | "credit" } | undefined
  >(undefined);

  const [total, setTotal] = useState({
    income: 0,
    outcome: 0,
  });

  useEffect(() => {
    console.log(total);
  }, [total]);

  return (
    <>
      <DraggableModal title="合計" width={250}>
        <TotalDisplay income={total.income} outcome={total.outcome} />
      </DraggableModal>
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
                  {record.freeeLinked && (
                    <span className={"mr-2 font-bold text-blue-600"}>
                      freee連携済み
                    </span>
                  )}
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
          freeeLinked: r.freeeLinkDetails[0]?.id,
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
        onSelect={useCallback(
          (records: { iocomeType: IocomeType; amount: number }[]) => {
            const calcTotal = (iocomeType: IocomeType) => {
              return records
                .filter((rec) => rec.iocomeType === iocomeType)
                .map((rec) => rec.amount)
                .reduce((acc, cur) => acc + cur, 0);
            };

            setTotal({
              income: calcTotal(IocomeType.Income),
              outcome: calcTotal(IocomeType.Outcome),
            });
          },
          [],
        )}
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
