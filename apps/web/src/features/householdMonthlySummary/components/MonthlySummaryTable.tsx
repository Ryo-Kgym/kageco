"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";

import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { DataTable } from "../../../components/ui/v4/table";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { paths } from "../../../routing/paths";

type ColumnAttribute = {
  title: string;
};

export type RowAttribute = {
  id: string;
  iocomeType: IocomeType;
  categoryName: string;
  total: number;
} & Record<string, number>;

type Props = {
  columns: Record<string, ColumnAttribute>;
  records: RowAttribute[];
  totals: RowAttribute[];
};

export const MonthlySummaryTable: FC<Props> = ({
  columns,
  records,
  totals: [incomeTotal, outcomeTotal],
}) => {
  const router = useRouter();

  const handleRowClick = (record: RowAttribute) => {
    // 合計行はクリックしても遷移しない
    if (record.id === "total") return;
    
    // 検索ページに遷移
    router.push(`${paths.household.search}?categoryIds=${record.id}`);
  };
  return (
    <DataTable<(typeof records)[number]>
      onRowClick={handleRowClick}
      columns={[
        {
          accessor: "id",
          title: "ID",
          hidden: true,
        },
        {
          accessor: "categoryName",
          title: "カテゴリ",
          width: 150,
          footer: (
            <div>
              <div>収入合計</div>
              <div>支出合計</div>
              <div>収入 - 支出</div>
            </div>
          ),
        },
        ...Object.entries(columns).map(([yyyyMM, attr]) => ({
          accessor: yyyyMM,
          title: attr.title,
          width: 100,
          textAlign: "right" as const,
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          render: ({ [yyyyMM]: amount, iocomeType }) => (
            <FormatPrice price={amount} iocomeType={iocomeType} />
          ),
          footer: (() => {
            const income = incomeTotal ? (incomeTotal[yyyyMM] ?? 0) : 0;
            const outcome = outcomeTotal ? (outcomeTotal[yyyyMM] ?? 0) : 0;

            return (
              <div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice price={income} iocomeType={IocomeType.Income} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice
                    price={outcome}
                    iocomeType={IocomeType.Outcome}
                  />
                </div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice
                    price={income - outcome}
                    iocomeType={
                      income > outcome ? IocomeType.Income : IocomeType.Outcome
                    }
                  />
                </div>
              </div>
            );
          })(),
        })),
        {
          accessor: "total",
          title: "合計",
          width: 100,
          textAlign: "right",
          render: ({ total, iocomeType }) => (
            <FormatPrice price={total} iocomeType={iocomeType} />
          ),
          footer: (() => {
            const income = incomeTotal ? incomeTotal.total : 0;
            const outcome = outcomeTotal ? outcomeTotal.total : 0;
            return (
              <div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice price={income} iocomeType={IocomeType.Income} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice
                    price={outcome}
                    iocomeType={IocomeType.Outcome}
                  />
                </div>
                <div style={{ textAlign: "right" }}>
                  <FormatPrice
                    price={income - outcome}
                    iocomeType={
                      income > outcome ? IocomeType.Income : IocomeType.Outcome
                    }
                  />
                </div>
              </div>
            );
          })(),
        },
      ]}
      records={records}
      recordsPerPage={1000}
      height={"90vh"}
    />
  );
};
