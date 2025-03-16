import type { ComponentProps } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { SelectProps } from "../../../components/ui/select/v4";
import type { TagInput } from "../../../components/ui/tag/TagInput";
import { IocomeType } from "../../../domain/model/household/IocomeType";

export const useSetDetailMaster = () => {
  const {
    setAccountData,
    setGenreData,
    setCategoryData,
    setTagData,
    setTemplateData,
  } = useDetailMasterZustand();
  return {
    setAccountData,
    setGenreData,
    setCategoryData,
    setTagData,
    setTemplateData,
  };
};

export const useGetDetailMaster = () => {
  const {
    getAccounts,
    getGenres,
    getCategories,
    getAllCategories,
    getTags,
    getTemplates,
  } = useDetailMasterZustand();
  return {
    getAccounts,
    getGenres,
    getCategories,
    getAllCategories,
    getTags,
    getTemplates,
  };
};

type TemplateData = {
  id: string;
  name: string;
  iocomeType: IocomeType;
  genreId: string;
  categoryId: string;
  amount: number;
  memo: string | null;
};

type State = {
  accountData: SelectProps<string>["data"];
  genreData: Record<IocomeType, SelectProps<string>["data"]>;
  categoryData: Record<string, SelectProps<string>["data"]>;
  tagData: ComponentProps<typeof TagInput>["data"];
  templateData: Record<string, TemplateData>;
};

type Actions = {
  setAccountData: (data: SelectProps<string>["data"]) => void;
  setGenreData: (data: Record<IocomeType, SelectProps<string>["data"]>) => void;
  setCategoryData: (data: Record<string, SelectProps<string>["data"]>) => void;
  setTagData: (data: ComponentProps<typeof TagInput>["data"]) => void;
  setTemplateData: (data: TemplateData[]) => void;
  getAccounts: () => SelectProps<string>["data"];
  getGenres: (type: IocomeType) => SelectProps<string>["data"];
  getCategories: (genreId: string) => SelectProps<string>["data"];
  getAllCategories: () => {
    group: string;
    items: SelectProps<string>["data"];
  }[];
  getTags: () => ComponentProps<typeof TagInput>["data"];
  getTemplates: () => TemplateData[];
};

const useDetailMasterZustand = create<State & Actions>()(
  immer((set, get) => ({
    accountData: [],
    genreData: {
      [IocomeType.Income]: [],
      [IocomeType.Outcome]: [],
    },
    categoryData: {},
    tagData: [],
    templateData: {},
    setAccountData: (data) =>
      set((state) => {
        state.accountData = data;
      }),
    setGenreData: (data) =>
      set((state) => {
        state.genreData = data;
      }),
    setCategoryData: (data) =>
      set((state) => {
        state.categoryData = data;
      }),
    setTagData: (data) =>
      set((state) => {
        state.tagData = data;
      }),
    setTemplateData: (data) =>
      set((state) => {
        state.templateData = Object.fromEntries(
          data.map((template) => [template.id, template]),
        );
      }),
    getAccounts: () => get().accountData,
    getGenres: (type) => get().genreData[type],
    getCategories: (genreId) => get().categoryData[genreId] ?? [],
    getAllCategories: () => {
      const genreNameMap = Object.fromEntries(
        Object.values(get().genreData)
          .flat()
          .map((v) => [v.value, v.label]),
      );

      return Object.entries(get().categoryData).map(([k, v]) => ({
        group: genreNameMap[k] ?? k,
        items: v,
      }));
    },
    getTags: () => get().tagData,
    getTemplates: () => Object.values(get().templateData),
  })),
);
