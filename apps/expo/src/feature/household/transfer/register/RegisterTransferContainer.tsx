import { useState } from "react";

import { RegisterTransferPresenter } from "./RegisterTransferPresenter";
import { useRegisterTransfer } from "./useRegisterTransfer";

export const RegisterTransferContainer = ({
  initialDate = new Date(),
}: {
  initialDate?: Date;
}) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [fromAccountId, setFromAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | null>(null);

  const { registerTransfer } = useRegisterTransfer();

  const registerable = typeof amount === "number" && amount > 0 && fromAccountId !== toAccountId;

  const resetHandler = () => {
    setDate(initialDate);
    setFromAccountId("");
    setToAccountId("");
    setAmount(null);
    setMemo(null);
  };

  const registerHandler = async () => {
    if (!registerable) return;

    try {
      await registerTransfer({
        date: date ?? new Date(),
        fromAccountId,
        toAccountId,
        amount,
        memo,
      });
      alert("登録しました");
      setAmount(0);
      setMemo(null);
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました");
    }
  };

  return (
    <RegisterTransferPresenter
      date={{
        value: date,
        setValue: setDate,
      }}
      fromAccount={{
        value: fromAccountId,
        setValue: setFromAccountId,
      }}
      toAccount={{
        value: toAccountId,
        setValue: setToAccountId,
      }}
      amount={{
        value: amount,
        setValue: setAmount,
      }}
      memo={{
        value: memo,
        setValue: setMemo,
      }}
      resetHandler={resetHandler}
      registerHandler={registerHandler}
      registerDisabled={!registerable}
    />
  );
};
