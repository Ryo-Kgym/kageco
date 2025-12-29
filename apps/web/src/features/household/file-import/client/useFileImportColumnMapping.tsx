import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ImportFileColumn } from "../types/importFileColumn";

export const useFileImportColumnMapping = () =>
  useFileImportColumnMappingState((store) => ({
    mapping: store.fileImportColumnMapping,
    setMapping: (key: ImportFileColumn, value: number | null) => {
      store.setFileImportColumnMapping({
        ...store.fileImportColumnMapping,
        [key]: value,
      });
    },
  }));

type State = {
  fileImportColumnMapping: Record<ImportFileColumn, number | null>;
};

type Actions = {
  setFileImportColumnMapping: (
    mapping: Record<ImportFileColumn, number | null>,
  ) => void;
};

const useFileImportColumnMappingState = create<State & Actions>()(
  immer((set) => ({
    fileImportColumnMapping: {},
    setFileImportColumnMapping: (mapping) =>
      set((state) => {
        state.fileImportColumnMapping = mapping;
      }),
  })),
);
