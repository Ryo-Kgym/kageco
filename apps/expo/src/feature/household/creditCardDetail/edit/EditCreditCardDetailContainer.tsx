import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { useEditCreditCardDetail } from "~/hooks/household/credit_card/useEditCreditCardDetail";
import { useGetCreditCardDetailById } from "~/hooks/household/credit_card/useGetCreditCardDetailById";
import type { IocomeType } from "~/types/iocome-type";
import { EditCreditCardDetailPresenter } from "./EditCreditCardDetailPresenter";

export const EditCreditCardDetailContainer = ({ id }: { id: string }) => {
  const { creditCardDetail, loading } = useGetCreditCardDetailById({ id });

  const [date, setDate] = useState<Date | undefined>(creditCardDetail.date);
  const [iocomeType, setIocomeType] = useState<IocomeType>("INCOME");
  const [genreId, setGenreId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | null>(null);

  const { editCreditCardDetail } = useEditCreditCardDetail();
  const { back } = useRouter();

  const resetHandler = () => {
    setDate(creditCardDetail.date);
    setIocomeType(creditCardDetail.genre.iocomeType);
    setGenreId(creditCardDetail.genre.id);
    setCategoryId(creditCardDetail.category.id);
    setAccountId(creditCardDetail.account.id);
    setAmount(creditCardDetail.amount);
    setMemo(creditCardDetail.memo);
  };

  const updateHandler = async () => {
    if (!amount) return;
    try {
      await editCreditCardDetail({
        id,
        genreId,
        categoryId,
        memo,
      });
      alert("更新しました");
      back();
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setDate(creditCardDetail.date);
    setIocomeType(creditCardDetail.genre.iocomeType);
    setGenreId(creditCardDetail.genre.id);
    setCategoryId(creditCardDetail.category.id);
    setAccountId(creditCardDetail.account.id);
    setAmount(creditCardDetail.amount);
    setMemo(creditCardDetail.memo);
  }, [loading]);

  return (
    <EditCreditCardDetailPresenter
      id={id}
      date={{
        value: date,
        default: creditCardDetail.date,
        setValue: setDate,
      }}
      iocomeType={{
        value: iocomeType,
        default: creditCardDetail.genre.iocomeType,
        setValue: setIocomeType,
      }}
      genre={{
        value: genreId,
        default: creditCardDetail.genre.id,
        setValue: setGenreId,
      }}
      category={{
        value: categoryId,
        default: creditCardDetail.category.id,
        setValue: setCategoryId,
      }}
      account={{
        value: accountId,
        default: creditCardDetail.account.id,
        setValue: setAccountId,
      }}
      amount={{
        value: amount,
        default: creditCardDetail.amount,
        setValue: setAmount,
      }}
      memo={{
        value: memo,
        default: creditCardDetail.memo,
        setValue: setMemo,
      }}
      resetHandler={resetHandler}
      updateHandler={updateHandler}
      disabled={loading}
    />
  );
};
