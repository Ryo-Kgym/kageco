import { useState } from "react";
import { Text, View } from "react-native";

import type { IocomeType } from "~/types/iocome-type";
import { EditableCategory, EditableGenre, EditableIocomeType } from "~/ui";
import type { FavoriteFilterArgValueInputComponent } from "../FavoriteFilterArgValueInput";

export const CategoryIdInput: FavoriteFilterArgValueInputComponent<{
  genre: { id: string; iocomeType: IocomeType };
}> = ({ value, setValue, option }) => {
  const [iocomeType, setIocomeType] = useState<IocomeType>(
    option?.genre.iocomeType ?? "INCOME",
  );
  const [genreId, setGenreId] = useState<string>(option?.genre.id ?? "");

  return (
    <View className={"gap-3"}>
      <View>
        <Text>タイプ</Text>
        <EditableIocomeType value={iocomeType} setValue={setIocomeType} />
      </View>
      <View>
        <Text>ジャンル</Text>
        <EditableGenre
          value={genreId}
          setValue={setGenreId}
          iocomeType={iocomeType}
        />
      </View>
      <View>
        <Text>カテゴリ</Text>
        <EditableCategory value={value} setValue={setValue} genreId={genreId} />
      </View>
    </View>
  );
};
