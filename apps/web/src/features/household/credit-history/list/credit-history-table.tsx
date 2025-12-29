"use client";

import type { YYYY_MM_DD, YYYY_MM_DD_HH_MM_SS } from "@/util/date/date";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { FormatPrice } from "../../../../components/molecules/FormatPrice";
import { DataTable } from "../../../../components/ui/v4/table";
import { IocomeType } from "../../../../domain/model/household/IocomeType";

type Props = {
  records: {
    id: string;
    withdrawalDate: YYYY_MM_DD;
    creditCard: string;
    accountName: string;
    totalAmount: number;
    totalCount: number;
    error?: string;
    importDatetime: YYYY_MM_DD_HH_MM_SS;
  }[];
};

export const CreditHistoryTable: FC<Props> = ({ records }) => {
  const { push } = useRouter();

  const showDetailPage = (summaryId: string) => {
    push(`/household/creditCard/${summaryId}`);
  };

  return (
    <DataTable
      columns={[
        {
          accessor: "withdrawalDate",
          title: "引落日",
          width: "50",
        },
        {
          accessor: "creditCard",
          title: "クレジットカード",
          width: "100",
        },
        {
          accessor: "accountName",
          title: "アカウント",
          width: "100",
        },
        {
          accessor: "totalCount",
          title: "件数",
          width: "100",
        },
        {
          accessor: "totalAmount",
          title: "合計金額",
          render: (v) => {
            return (
              <FormatPrice
                price={v.totalAmount as number}
                iocomeType={IocomeType.Outcome}
              />
            );
          },
        },
        {
          accessor: "error",
          title: "エラー",
          width: "100",
        },
        {
          accessor: "importDatetime",
          title: "取込日時",
          width: "100",
        },
      ]}
      records={records}
      onRowClick={(v) => showDetailPage(v.id)}
    />
  );
};
