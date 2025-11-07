"use client";

import { useState } from "react";

import { IocomeType } from "../../../domain/model/household/IocomeType";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { addCategory } from "../useServer/addCategory";
import { CategoryAddPresenter } from "./CategoryAddPresenter";

export const CategoryAddContainer = () => {
  const [inputCategoryName, setInputCategoryName] = useState<string>("");
  const [inputIocomeType, setInputIocomeType] = useState<IocomeType>(IocomeType.Income);
  const [inputGenreId, setInputGenreId] = useState<string | null>("");
  const [inputIsValid, setInputIsValid] = useState<boolean>(true);
  const [inputDisplayOrder, setInputDisplayOrder] = useState<number | "">(0);

  const registerHandler = async () => {
    try {
      await addCategory({
        categoryName: inputCategoryName,
        genreId: inputGenreId as string,
        validFlag: inputIsValid,
        displayOrder: Number(inputDisplayOrder),
      });

      successPopup("登録しました");
    } catch (e) {
      console.error(e);
      errorPopup("登録に失敗しました");
    }
  };

  const registerable = inputCategoryName !== "" && inputGenreId !== null;

  return (
    <CategoryAddPresenter
      inputCategoryName={inputCategoryName}
      setInputCategoryName={setInputCategoryName}
      inputIocomeType={inputIocomeType}
      setInputIocomeType={setInputIocomeType}
      inputGenreId={inputGenreId}
      setInputGenreId={setInputGenreId}
      inputIsValid={inputIsValid}
      setInputIsValid={setInputIsValid}
      inputDisplayOrder={inputDisplayOrder}
      setInputDisplayOrder={setInputDisplayOrder}
      registerHandler={registerHandler}
      registerable={registerable}
    />
  );
};
