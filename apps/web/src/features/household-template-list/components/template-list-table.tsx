"use client";

import type { FC } from "react";

import { DataTable } from "../../../components/ui/v4/table";
import type { TemplateListRow } from "../types/template-list-row";

type Props = {
  templates: TemplateListRow[];
};

export const TemplateListTable: FC<Props> = ({ templates }) => {
  if (templates.length === 0) {
    return <div>テンプレートがありません</div>;
  }

  return (
    <DataTable
      columns={[
        {
          accessor: "name",
          title: "名前",
          width: "30%",
        },
        {
          accessor: "amount",
          title: "金額",
          width: "20%",
          textAlign: "right",
          render: (template) => template.amount.toLocaleString(),
        },
        {
          accessor: "memo",
          title: "メモ",
          width: "50%",
        },
      ]}
      records={templates.map((template) => ({
        id: template.id,
        name: template.name,
        amount: template.amount,
        memo: template.memo,
      }))}
    />
  );
};
