"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, FC } from "react";

import { Table, type TableProps } from "../../../components/atoms/Table";
import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { Button } from "../../../components/ui/button/v5";
import { Tag } from "../../../components/ui/tag/Tag";
import { paths } from "../../../routing/paths";
import type { CreditDetailRow } from "../types/creditDetailRow";
import { CreditSummaryTable } from "./CreditSummaryTable";

type Props = {
  creditCardSummaryId: string;
  summary: ComponentProps<typeof CreditSummaryTable>;
  details: CreditDetailRow[];
};
export const CreditDetailListClient: FC<Props> = ({ creditCardSummaryId, summary, details }) => {
  const { push } = useRouter();

  const tableProps: TableProps[] =
    details.map((detail, index) => ({
      keyPrefix: "creditDetail",
      columns: [
        { value: index + 1 },
        { value: detail.date, align: "center" },
        {
          value: detail.genreName,
        },
        { value: detail.categoryName },
        {
          value: <FormatPrice iocomeType={detail.iocomeType} price={detail.amount} />,
          align: "right",
        },
        {
          value: (
            <div className={"flex items-center"}>
              {detail.tags.map((tag) => (
                <Tag key={tag.value} label={tag.label} colorCode={tag.colorCode} />
              ))}
              <span>{detail.memo}</span>
            </div>
          ),
        },
      ],
      onClick: () =>
        push(
          paths.household.creditDetail.edit({
            creditCardSummaryId,
            creditDetailId: detail.id,
          }),
        ),
    })) ?? [];

  const backHandler = () => push(paths.household.creditCard);

  return (
    <div className={"space-y-3"}>
      <CreditSummaryTable {...summary} />
      <Table
        header={["No.", "日付", "ジャンル", "カテゴリ", "金額", "メモ"]}
        tablePropsList={tableProps}
        size={"xs"}
        // toBottom
        height={"50vh"}
        defaultBottom={false}
      />
      <div className={"flex"}>
        <Button type={"back"} onClick={backHandler} label={"戻る"} />
      </div>
    </div>
  );
};
