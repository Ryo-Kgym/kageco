"use client";

import type { FC } from "react";

import { Loading } from "../../../components/ui/v5/loading/Loading";
import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { useNavigation } from "../../../routing/client/useNavigation";

import "../useServer/updateCreditDetail";

import { useStateCreditDetail } from "../hooks/useStateCreditDetail";
import { updateCreditDetail } from "../useServer/updateCreditDetail";
import { CreditCardDetailEditPresenter } from "./CreditCardDetailEditPresenter";

type Props = {
  id: string;
  onClose?: () => void;
};

export const CreditCardDetailEditContainer: FC<Props> = ({
  id,
  onClose = () => undefined,
}) => {
  const { formData, setFormData, initializeForm, display } =
    useStateCreditDetail({
      id,
    });

  const { refresh } = useNavigation();

  const updateHandler = async () => {
    if (!formData) return;
    const { genreId, categoryId, memo, tags } = formData;

    try {
      if (genreId === null) {
        errorPopup("ジャンルを選択してください。");
        return;
      }
      if (categoryId === null) {
        errorPopup("カテゴリーを選択してください。");
        return;
      }

      await updateCreditDetail({
        id,
        genreId,
        categoryId,
        memo,
        tags,
      });
      successPopup("更新しました。");
      refresh();
      onClose();
    } catch (e) {
      errorPopup("更新に失敗しました。");
    }
  };

  if (formData === undefined) return <Loading />;

  return (
    <CreditCardDetailEditPresenter
      formData={formData}
      display={display}
      setIocomeType={(value: IocomeType) => {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            iocomeType: value,
            genreId: null,
            categoryId: null,
          };
        });
      }}
      setGenreId={(value) => {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            genreId: value,
            categoryId: null,
          };
        });
      }}
      setCategoryId={(value) => {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            categoryId: value,
          };
        });
      }}
      setMemo={(value: string) => {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            memo: value,
          };
        });
      }}
      setTags={(value) => {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            tags: value,
          };
        });
      }}
      onClickUpdate={updateHandler}
      onClickReset={initializeForm}
    />
  );
};
