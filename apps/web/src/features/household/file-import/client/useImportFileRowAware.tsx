import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IocomeType } from "../../../../domain/model/household/IocomeType";

export const useImportFileRowAware = () =>
  useImportFileRowAwareZustandState((store) => ({
    importFileRowAware: store.importFileRowAware,
    setImportFileRowAware: (row: number, attributes: Attributes) => {
      store.setImportFileRowAware({
        ...store.importFileRowAware,
        [row]: attributes,
      });
    },
    clearImportFileRowAware: () => {
      store.setImportFileRowAware({});
    },
  }));

type Attributes = {
  date: Date;
  amount: number;
  memo: string;
  genreId: string;
  categoryId: string;
  iocomeType: IocomeType;
};

type State = {
  importFileRowAware: Record<number, Attributes>;
};

type Actions = {
  setImportFileRowAware: (value: Record<number, Attributes>) => void;
};

const useImportFileRowAwareZustandState = create<State & Actions>()(
  immer((set) => ({
    importFileRowAware: {},
    setImportFileRowAware: (mapping) =>
      set((state) => {
        state.importFileRowAware = mapping;
      }),
  })),
);
