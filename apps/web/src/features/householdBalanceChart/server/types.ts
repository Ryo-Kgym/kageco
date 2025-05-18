import type { YYYY_MM } from "@/util/date/date";

export type SumBalance = Record<YYYY_MM, SumBalanceAttributes>;

export type SumBalanceAttributes = {
  income: number;
  outcome: number;
  deposit: number;
  diff: number;
};
