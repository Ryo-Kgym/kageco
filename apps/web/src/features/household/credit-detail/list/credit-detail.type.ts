import type { IocomeType } from "../../../../domain/model/household/IocomeType";

export type CreditDetailType = {
  id: string;
  date: string;
  genreName: string;
  categoryName: string;
  iocomeType: IocomeType;
  amount: number;
  memo: string;
  tags: { label: string; value: string; colorCode: string }[];
};
