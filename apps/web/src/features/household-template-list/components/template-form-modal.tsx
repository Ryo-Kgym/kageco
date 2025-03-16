"use client";

import type { FC } from "react";

import { Modal } from "../../../components/atoms/Modal";
import { TemplateForm } from "./template-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const TemplateFormModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} size="500px">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">テンプレート登録</h2>
        <TemplateForm onComplete={onClose} />
      </div>
    </Modal>
  );
};
