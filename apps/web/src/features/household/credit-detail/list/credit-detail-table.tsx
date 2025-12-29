"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, FC } from "react";

import { FormatPrice } from "../../../../components/molecules/FormatPrice";
import { Tag } from "../../../../components/ui/tag/Tag";
import { DataTable } from "../../../../components/ui/v4/table";
import { paths } from "../../../../routing/paths";
import type { CreditDetailType } from "./credit-detail.type";
import { CreditSummaryForm } from "./credit-summary-form";

type Props = {
  creditCardSummaryId: string;
  summary: ComponentProps<typeof CreditSummaryForm>;
  details: CreditDetailType[];
};
export const CreditDetailTable: FC<Props> = ({
  creditCardSummaryId,
  summary,
  details,
}) => {
  const { push } = useRouter();

  return (
    <div className={"flex gap-3"}>
      <div className={"w-[20%]"}>
        <CreditSummaryForm {...summary} />
      </div>
      <div className={"flex-1"}>
        <DataTable
          records={details}
          columns={[
            {
              accessor: "date",
              title: "発生日",
              width: 120,
            },
            {
              accessor: "genreName",
              title: "ジャンル",
              width: 180,
            },
            {
              accessor: "categoryName",
              title: "カテゴリ",
              width: 180,
            },
            {
              accessor: "amount",
              title: "金額",
              render: (v) => (
                <FormatPrice iocomeType={v.iocomeType} price={v.amount} />
              ),
            },
            {
              accessor: "tags",
              title: "メモ・タグ",
              render: (v) => {
                return (
                  <div className={"flex items-center"}>
                    {v.tags.map((tag) => (
                      <Tag
                        key={tag.value}
                        label={tag.label}
                        colorCode={tag.colorCode}
                      />
                    ))}
                    <span>{v.memo}</span>
                  </div>
                );
              },
            },
          ]}
          onRowClick={(v) =>
            push(
              paths.household.creditDetail.edit({
                creditCardSummaryId,
                creditDetailId: v.id,
              }),
            )
          }
        />
      </div>
    </div>
  );
};
