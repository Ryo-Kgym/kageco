import { IocomeType } from "../../../domain/model/household/IocomeType";

export type TemplateForm = {
  name: string;
  genreId: string;
  iocomeType: IocomeType;
  categoryId: string;
  accountId: string;
  amount: number;
  memo: string;
};

export const initialTemplateForm: TemplateForm = {
  name: "",
  genreId: "",
  iocomeType: IocomeType.Income,
  categoryId: "",
  accountId: "",
  amount: 0,
  memo: "",
};
