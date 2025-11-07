import type { FavoriteFilterArgKey } from "../favorite-filter-type";
import { CategoryIdInput, YearInput } from "./_input";

export const FavoriteFilterArgValueInput = <O,>({
  argKey,
  value,
  setValue,
  option,
}: {
  argKey: FavoriteFilterArgKey;
} & FavoriteFilterArgValueInputProps<O>) => inputMap[argKey].Component({ value, setValue, option });

const inputMap: {
  [key in FavoriteFilterArgKey]: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Component: FavoriteFilterArgValueInputComponent<any>;
  };
} = {
  categoryId: {
    Component: CategoryIdInput,
  },
  year: {
    Component: YearInput,
  },
};

export type FavoriteFilterArgValueInputProps<O> = {
  value: string;
  setValue: (value: string) => void;
  option?: O;
};

export type FavoriteFilterArgValueInputComponent<O = undefined> = React.FC<
  FavoriteFilterArgValueInputProps<O>
>;
