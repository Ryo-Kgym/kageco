import type { IocomeType } from "~/types/iocome-type";

export type Detail = {
  id: string;
  date?: Date;
  accountName?: string;
  amount: number;
  categoryName: string;
  genreName: string;
  iocomeType: IocomeType;
  redirectHandler: () => void;
  memo: string | null;
  type?: DetailType;
};

export type DetailType = "daily" | "creditCardDetail" | "creditCardSummary";
