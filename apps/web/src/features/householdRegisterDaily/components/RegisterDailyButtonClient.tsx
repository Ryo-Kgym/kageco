"use client";

import type { IocomeType } from "domain/model/household/IocomeType";
import { type ComponentProps, type FC, useEffect } from "react";

import type { SelectProps } from "../../../components/ui/select/v4";
import type { TagInput } from "../../../components/ui/tag/TagInput";
import { useSetDetailMaster } from "../hooks/useDetailMaster";
import { RegisterDailyButton } from "./RegisterDailyButton";

type Props = {
  accountData: SelectProps<string>["data"];
  genreData: Record<IocomeType, SelectProps<string>["data"]>;
  categoryData: Record<string, SelectProps<string>["data"]>;
  tagData: ComponentProps<typeof TagInput>["data"];
  templateData: Record<
    string,
    {
      id: string;
      name: string;
      iocomeType: string;
      genreId: string;
      categoryId: string;
      amount: number;
      memo: string | null;
    }
  >;
};

export const RegisterDailyButtonClient: FC<Props> = ({
  accountData,
  genreData,
  categoryData,
  tagData,
  templateData,
}) => {
  const set = useSetDetailMaster();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    set.setAccountData(accountData);
    set.setGenreData(genreData);
    set.setCategoryData(categoryData);
    set.setTagData(tagData);
    set.setTemplateData(Object.values(templateData));
  }, []);

  return <RegisterDailyButton />;
};
