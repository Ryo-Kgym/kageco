"use client";

import { useState } from "react";
import type { FC } from "react";

import { Button } from "../../../components/ui/button/v5";
import type { TemplateListRow } from "../types/template-list-row";
import { TemplateFormModal } from "./template-form-modal";
import { TemplateListTable } from "./template-list-table";

type Props = {
  templates: TemplateListRow[];
};

export const TemplateListClient: FC<Props> = ({ templates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button label="テンプレート登録" onClick={openModal} type="add" />
      </div>

      <div className="rounded-md border p-4">
        <h2 className="mb-4 text-xl font-bold">テンプレート一覧</h2>
        <TemplateListTable templates={templates} />
      </div>

      <TemplateFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
