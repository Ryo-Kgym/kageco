import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { useSplitCreditCardDetail } from "~/feature/household/creditCardDetail/split/useSplitCreditCardDetail";
import { useGetCreditCardDetailById } from "~/hooks/household/credit_card/useGetCreditCardDetailById";
import type { IocomeType } from "~/types/iocome-type";
import { SplitCreditCardDetailPresenter } from "./SplitCreditCardDetailPresenter";

export const SplitCreditCardDetailContainer = ({ id }: { id: string }) => {
  const { creditCardDetail, loading } = useGetCreditCardDetailById({ id });

  const [amount, setAmount] = useState<number | null>(null);

  const [splitIocomeType, setSplitIocomeType] = useState<IocomeType>("INCOME");
  const [splitGenreId, setSplitGenreId] = useState<string>("");
  const [splitCategoryId, setSplitCategoryId] = useState<string>("");
  const [splitAmount, setSplitAmount] = useState<number | null>(null);
  const [splitMemo, setSplitMemo] = useState<string | null>(null);

  const { split } = useSplitCreditCardDetail();
  const { back } = useRouter();
  const updatable = splitAmount && splitAmount > 0;

  const resetHandler = () => {
    setAmount(creditCardDetail.amount);

    setSplitGenreId(creditCardDetail.genre.id);
    setSplitCategoryId(creditCardDetail.category.id);
    setSplitAmount(0);
    setSplitMemo(null);
  };

  const updateHandler = async () => {
    try {
      await split({
        original: creditCardDetail,
        split: {
          genreId: splitGenreId,
          categoryId: splitCategoryId,
          amount: splitAmount ?? 0,
          memo: splitMemo ?? "",
        },
      });
      alert("分割しました");
      back();
    } catch (e) {
      console.error(e);
      alert("分割に失敗しました");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(
    () => {
      setAmount(creditCardDetail.amount);

      setSplitIocomeType(creditCardDetail.genre.iocomeType);
      setSplitGenreId(creditCardDetail.genre.id);
      setSplitCategoryId(creditCardDetail.category.id);
      setSplitAmount(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading],
  );

  return (
    <SplitCreditCardDetailPresenter
      iocomeType={{
        value: splitIocomeType,
        default: creditCardDetail.genre.iocomeType,
        setValue: () => undefined,
      }}
      genre={{
        value: splitGenreId,
        default: creditCardDetail.genre.id,
        setValue: setSplitGenreId,
      }}
      category={{
        value: splitCategoryId,
        default: creditCardDetail.category.id,
        setValue: setSplitCategoryId,
      }}
      amount={{
        value: amount,
        default: creditCardDetail.amount,
        setValue: () => undefined,
      }}
      splitAmount={{
        value: splitAmount,
        default: 0,
        setValue: (v) => {
          setAmount(creditCardDetail.amount - (v ?? 0));
          setSplitAmount(v);
        },
      }}
      memo={{
        value: splitMemo,
        default: creditCardDetail.memo,
        setValue: setSplitMemo,
      }}
      resetHandler={resetHandler}
      updateHandler={updateHandler}
      disabled={loading || !updatable}
    />
  );
};
