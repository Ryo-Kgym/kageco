import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from "react-native";

import type { IocomeType } from "~/types/iocome-type";
import {
  EditableAmount,
  EditableCategory,
  EditableGenre,
  EditableMemo,
  ResetButton,
  UpdateButton,
} from "~/ui";

type FieldType<T> = {
  value: T;
  setValue: (value: T) => void;
  default: T;
};

export const SplitCreditCardDetailPresenter = ({
  iocomeType,
  genre,
  category,
  amount,
  splitAmount,
  memo,
  resetHandler,
  updateHandler,
  disabled,
}: {
  iocomeType: FieldType<IocomeType>;
  genre: FieldType<string>;
  category: FieldType<string>;
  amount: FieldType<number | null>;
  splitAmount: FieldType<number | null>;
  memo: FieldType<string | null>;
  resetHandler: () => void;
  updateHandler: () => void;
  disabled: boolean;
}) => (
  <KeyboardAvoidingView
    behavior={"position"}
    contentContainerStyle={{}}
    keyboardVerticalOffset={100}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={"gap-3"}>
        <Text>分割前</Text>
        <View>
          <Text>金額</Text>
          <EditableAmount
            value={amount.value}
            setValue={amount.setValue}
            defaultValue={amount.default}
            disabled
          />
        </View>
        <View className={"w-full border-b-2 border-gray-300"} />
        <Text>分割後</Text>
        <View>
          <Text>ジャンル</Text>
          <EditableGenre
            value={genre.value}
            setValue={genre.setValue}
            defaultValue={genre.default}
            iocomeType={iocomeType.value}
          />
        </View>
        <View>
          <Text>カテゴリ</Text>
          <EditableCategory
            value={category.value}
            setValue={category.setValue}
            defaultValue={category.default}
            genreId={genre.value}
          />
        </View>
        <View>
          <Text>金額</Text>
          <EditableAmount
            value={splitAmount.value}
            setValue={splitAmount.setValue}
            defaultValue={splitAmount.default}
          />
        </View>
        <View>
          <Text>メモ</Text>
          <EditableMemo
            value={memo.value}
            setValue={memo.setValue}
            defaultValue={memo.default ?? undefined}
          />
        </View>
        <View className={"flex-row justify-between"}>
          <View className={"w-1/2"}>
            <UpdateButton updateHandler={updateHandler} disabled={disabled} />
          </View>
          <View className={"w-1/2"}>
            <ResetButton resetHandler={resetHandler} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
