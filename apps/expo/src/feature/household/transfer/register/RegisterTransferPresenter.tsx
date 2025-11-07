import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { EditableAccount, EditableAmount, EditableDate, EditableMemo, RegisterButton } from "~/ui";

type FieldType<T> = {
  value: T;
  setValue: (value: T) => void;
};

export const RegisterTransferPresenter = ({
  date,
  amount,
  fromAccount,
  toAccount,
  memo,
  resetHandler,
  registerHandler,
  registerDisabled,
}: {
  date: FieldType<Date | undefined>;
  fromAccount: FieldType<string>;
  toAccount: FieldType<string>;
  amount: FieldType<number | null>;
  memo: FieldType<string | null>;
  resetHandler: () => void;
  registerHandler: () => void;
  registerDisabled: boolean;
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
          <EditableDate value={date.value} setValue={date.setValue} loadingValue={"-"} />
        </View>
        <View>
          <Text>アカウント</Text>
          <Text className={"text-sm text-gray-500"}>送信元</Text>
          <EditableAccount value={fromAccount.value} setValue={fromAccount.setValue} />
          <Text className={"text-sm text-gray-500"}>送信先</Text>
          <EditableAccount value={toAccount.value} setValue={toAccount.setValue} />
        </View>
        <View>
          <Text>金額</Text>
          <EditableAmount value={amount.value} setValue={amount.setValue} />
        </View>
        <View>
          <Text>メモ</Text>
          <EditableMemo value={memo.value} setValue={memo.setValue} />
        </View>
        <View className={"h-16 flex-row justify-between"}>
          <View className={"w-1/2"}>
            <RegisterButton registerHandler={registerHandler} disabled={registerDisabled} />
          </View>
          <View className={"w-1/2"}>
            <Button title={"リセット"} onPress={resetHandler} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
