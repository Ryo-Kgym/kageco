import { Picker } from "~/ui/Picker";
import type { FavoriteFilterArgKey } from "../favorite-filter-type";
import { favoriteFilterArgKeyArray } from "../favorite-filter-type";

export const FavoriteFilterArgKeyPicker = ({
  value,
  setValue,
  disabled,
}: {
  value: FavoriteFilterArgKey;
  setValue: (value: FavoriteFilterArgKey) => void;
  disabled?: boolean;
}) => (
  <Picker
    value={value}
    setValue={setValue}
    data={Object.keys(favoriteFilterArgKeyArray).map((k) => ({
      value: k as FavoriteFilterArgKey,
      label: favoriteFilterArgKeyArray[k as FavoriteFilterArgKey].label,
    }))}
    disabled={disabled}
  />
);
