import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import type { IocomeType } from "~/types/iocome-type";
import {
  DeleteButton,
  EditableAccount,
  EditableAmount,
  EditableCategory,
  EditableDate,
  EditableGenre,
  EditableIocomeType,
  EditableMemo,
  ResetButton,
  UpdateButton,
} from "~/ui";

type FieldType<T> = {
  value: T;
  setValue: (value: T) => void;
  default: T;
};

export const EditDailyPresenter = ({
  date,
  iocomeType,
  genre,
  category,
  amount,
  account,
  memo,
  resetHandler,
  editHandler,
  deleteHandler,
  disabled,
}: {
  id: string;
  date: FieldType<Date | undefined>;
  iocomeType: FieldType<IocomeType>;
  genre: FieldType<string>;
  category: FieldType<string>;
  account: FieldType<string>;
  amount: FieldType<number | null>;
  memo: FieldType<string | null>;
  resetHandler: () => void;
  editHandler: () => void;
  deleteHandler: () => void;
  disabled: boolean;
}) => (
  <KeyboardAvoidingView
    behavior={"position"}
    contentContainerStyle={{}}
    keyboardVerticalOffset={100}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={"gap-3"}>
        <View>
          <Text>日付</Text>
          <EditableDate
            value={date.value}
            setValue={date.setValue}
            loadingValue={"-"}
          />
        </View>
        <View>
          <Text>タイプ</Text>
          <EditableIocomeType
            value={iocomeType.value}
            setValue={iocomeType.setValue}
            defaultValue={iocomeType.default}
          />
        </View>
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
          <Text>アカウント</Text>
          <EditableAccount
            value={account.value}
            setValue={account.setValue}
            defaultValue={account.default}
          />
        </View>
        <View>
          <Text>金額</Text>
          <EditableAmount
            value={amount.value}
            setValue={amount.setValue}
            defaultValue={amount.default}
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
          <View className={"w-1/3"}>
            <UpdateButton updateHandler={editHandler} disabled={disabled} />
          </View>
          <View className={"w-1/3"}>
            <DeleteButton deleteHandler={deleteHandler} disabled={disabled} />
          </View>
          <View className={"w-1/3"}>
            <ResetButton resetHandler={resetHandler} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
