import { useState } from "react";
import { Text, View } from "react-native";

import type { IocomeType } from "~/types/iocome-type";
import { UpdateButton } from "~/ui";
import type { FavoriteFilterArgKey } from "../favorite-filter-type";
import { FavoriteFilterArgKeyPicker, FavoriteFilterArgValueInput } from "../ui";
import { useEditFavoriteFilterArg } from "./useEditFavoriteFilterArg";

export const EditFavoriteFilterArg = ({
  arg,
  updateAfterHandler = () => undefined,
}: {
  arg: {
    id: string;
    key: FavoriteFilterArgKey;
    value: string;
    option:
      | {
          genre: { id: string; iocomeType: IocomeType };
        }
      | undefined;
  };
  updateAfterHandler?: () => void;
}) => {
  const [key, setKey] = useState<FavoriteFilterArgKey>(arg.key);
  const [value, setValue] = useState<string>(arg.value);
  const { editFavoriteFilterArg } = useEditFavoriteFilterArg();
  const active = !!value && !!key;

  const editHandler = async () => {
    try {
      await editFavoriteFilterArg({
        argId: arg.id,
        value,
      });
      alert("更新しました");
      updateAfterHandler();
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  return (
    <View>
      <Text>Key</Text>
      <FavoriteFilterArgKeyPicker value={key} setValue={setKey} disabled />
      <FavoriteFilterArgValueInput
        argKey={key}
        value={value}
        setValue={setValue}
        option={arg.option}
      />
      <UpdateButton updateHandler={editHandler} disabled={!active} />
    </View>
  );
};
