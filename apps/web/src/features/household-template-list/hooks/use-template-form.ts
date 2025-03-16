"use client";

import { useState } from "react";

import { type TemplateForm, initialTemplateForm } from "../types/template-form";

export const useTemplateForm = () => {
  const [form, setForm] = useState<TemplateForm>(initialTemplateForm);

  const resetForm = () => {
    setForm(initialTemplateForm);
  };

  const setName = (name: string) => {
    setForm((prev) => ({ ...prev, name }));
  };

  const setIocomeType = (iocomeType: TemplateForm["iocomeType"]) => {
    setForm((prev) => ({ ...prev, iocomeType, genreId: "", categoryId: "" }));
  };

  const setGenreId = (genreId: string) => {
    setForm((prev) => ({ ...prev, genreId, categoryId: "" }));
  };

  const setCategoryId = (categoryId: string) => {
    setForm((prev) => ({ ...prev, categoryId }));
  };

  const setAccountId = (accountId: string) => {
    setForm((prev) => ({ ...prev, accountId }));
  };

  const setAmount = (amount: number) => {
    setForm((prev) => ({ ...prev, amount }));
  };

  const setMemo = (memo: string) => {
    setForm((prev) => ({ ...prev, memo }));
  };

  return {
    form,
    setName,
    setIocomeType,
    setGenreId,
    setCategoryId,
    setAccountId,
    setAmount,
    setMemo,
    resetForm,
  };
};
