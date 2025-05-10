import type { IocomeType } from "../../../domain/model/household/IocomeType";

export type SearchRow = {
  id: string;
  settlementDate: string;
  withdrawalDate: string;
  type: string;
  amount: number;
  account: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
    iocomeType: IocomeType;
  };
  category: {
    id: string;
    name: string;
  };
  memo: string;
  tags: {
    id: string;
    name: string;
    colorCode: string;
    displayOrder: number;
  }[];
  freeeLinkDetails: {
    id: string;
    linkedDatetime: string;
  }[];
};
