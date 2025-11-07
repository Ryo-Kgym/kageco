"use client";

import { useState } from "react";

import { convertToYmd } from "@/util/date/convertToYmd";
import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { IocomeTotal } from "../../../components/molecules/Total";
import { TagGroup } from "../../../components/ui/tag/TagGroup";
import { DataTable } from "../../../components/ui/v4/table";
import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { DailyDetailEditModal } from "../../householdModifyDailyDetail/components/daily-detail-edit-modal";
import type { AccountDetailRow } from "../types/accountDetailRow";

export const AccountDetailTable = ({
  records,
  incomeTotal,
  outcomeTotal,
}: {
  records: AccountDetailRow[];
  incomeTotal: number;
  outcomeTotal: number;
}) => {
  const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  return (
    <>
      <DataTable
        columns={[
          { accessor: "type", title: "タイプ", hidden: true },
          {
            accessor: "date",
            title: "決済日",
            width: "10%",
            render: ({ date }) => convertToYmd(date),
          },
          { accessor: "genre", title: "ジャンル", width: "20%" },
          {
            accessor: "iocomeType",
            title: "収支",
            hidden: true,
          },
          { accessor: "category", title: "カテゴリ", width: "10%" },
          {
            accessor: "amount",
            title: "金額",
            width: "10%",
            textAlign: "right",
            render: ({ amount, iocomeType }) => (
              <FormatPrice price={amount} iocomeType={iocomeType as IocomeType} />
            ),
          },
          {
            accessor: "memo",
            title: "メモ",
            width: "50%",
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
        records={records}
        onRowClick={({ id, type }) => {
          if (type === "credit") return;

          setId(id);
          setModifyModalOpen(true);
        }}
      />
      <IocomeTotal income={incomeTotal} outcome={outcomeTotal} />
      {id && (
        <DailyDetailEditModal
          id={id}
          isOpen={modifyModalOpen}
          onCloseHandler={() => setModifyModalOpen(false)}
        />
      )}
    </>
  );
};
