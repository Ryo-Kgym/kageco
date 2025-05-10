import { TZDateTime, YYYY_MM_DD, YYYY_MM_DD_HH_MM_SS, YYYYmmDD } from "@/type/date/date";

export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bpchar: string;
  date: YYYY_MM_DD;
  numeric: number;
  timestamp: YYYY_MM_DD_HH_MM_SS;
};

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export type HouseholdDetailTagInsertInput = {};
export type HouseholdTagSetInput = {};
export type HouseholdTagInsertInput = {};
export type HouseholdCreditCardSummarySetInput = {};
export type OrderBy = {};

export interface HouseholdFreeeLinkDetailInsertInput {
  detailId: string
  id: string
  linkedDatetime: YYYY_MM_DD_HH_MM_SS
}