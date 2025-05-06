import type { IocomeType } from "../../../domain/model/household/IocomeType";

export type CreditDetailEditFormState = {
  genreId: string | null;
  categoryId: string | null;
  memo: string;
  tags: string[];
};
export type CreditDetailEditDisplayState = {
  id: string;
  date: Date;
  iocomeType: IocomeType;
  amount: number;
  withdrawalDate: Date;
};
