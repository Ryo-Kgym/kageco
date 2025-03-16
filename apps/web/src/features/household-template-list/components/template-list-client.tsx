"use client";

import type { FC } from "react";

import type { TemplateListRow } from "../types/template-list-row";
import { TemplateListTable } from "./template-list-table";

type Props = {
  templates: TemplateListRow[];
};

export const TemplateListClient: FC<Props> = ({ templates }) => {
  return (
    <div>
      <TemplateListTable templates={templates} />
    </div>
  );
};
