export type Feature =
  | "register"
  | "balance"
  | "favoriteFilter"
  | "yearly"
  | "monthly"
  | "monthlyCategory"
  | "setting"
  | "reload";

export type ArgsType = "year" | "month" | "genreType" | "iocomeType" | "filterId";

export type GenreParamType = "FLC" | "FXD" | "ALL";

export type IocomeParamType = "I" | "O";

export type ArgsMapType =
  | { type: "year"; value: number }
  | { type: "month"; value: number }
  | { type: "genreType"; value: GenreParamType }
  | { type: "iocomeType"; value: IocomeParamType }
  | { type: "filterId"; value: string };

export type SettingProps = {
  id: string;
  feature: Feature;
  order: number;
  argsMap: ArgsMapType[];
};
