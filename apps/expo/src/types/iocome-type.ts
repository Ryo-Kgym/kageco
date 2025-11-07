const iocomeTypeMap = {
  INCOME: { label: "收入" },
  OUTCOME: { label: "支出" },
} as const;

export type IocomeType = keyof typeof iocomeTypeMap;
export const iocomeTypeArray = Object.keys(iocomeTypeMap).map((key) => key as IocomeType);

export const getLabel = (iocomeType: IocomeType) => {
  return iocomeTypeMap[iocomeType].label;
};
