import type { YYYY_MM_DD } from "@/util/date/date";

import { IocomeType } from "./IocomeType";

export type DailyDetail = {
  id: string;
  date: YYYY_MM_DD;
  amount: number;
  iocomeType: IocomeType;
  genreId: string;
  categoryId: string;
  accountId: string;
  memo: string;
  tags: string[];
  categoryName?: string;
};

export const initialState = {
  id: "",
  date: new Date(),
  amount: 0,
  iocomeType: IocomeType.Income,
  genreId: "",
  categoryId: "",
  accountId: "",
  memo: "",
  tags: [],
};
