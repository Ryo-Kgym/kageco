import type { FC } from "react";

import { IocomeType } from "../../../domain/model/household/IocomeType";
import { Segment } from "./Segment";

type Props = {
  iocomeType: IocomeType;
  onChange: (_: IocomeType) => void;
  disabled?: boolean;
};

export const IocomeTypeSegment: FC<Props> = ({ iocomeType, onChange, disabled = false }) => {
  return <Segment value={iocomeType} onChange={onChange} disabled={disabled} data={data} />;
};
const data = [
  { value: IocomeType.Income, label: "収入" },
  { value: IocomeType.Outcome, label: "支出" },
];
