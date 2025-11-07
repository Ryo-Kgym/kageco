/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

type Props = {
  value: string | boolean;
  rule: Map<string | boolean, string>;
};
export const Status = ({ value, rule }: Props) => (
  <div className={`font-bold border-2 rounded-2xl ${rule.get(value) ?? ""}`}>{value}</div>
);
