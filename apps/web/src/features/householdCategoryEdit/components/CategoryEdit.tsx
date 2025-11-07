"use client";

import { GenreSelect } from "components/ui/select/GenreSelect";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import type { CategoryData } from "../useServer/getCategoryById";
import { getCategoryById } from "../useServer/getCategoryById";
import { updateCategoryById } from "../useServer/updateCategoryById";

import { GenreNameTextInput } from "../../../components/molecules/CustomTextInput";
import { Button } from "../../../components/ui/button/v5";
import { DisplayOrderInput } from "../../../components/ui/numberInput/displayOrder/DisplayOrderInput";
import { IocomeTypeSegment } from "../../../components/ui/segment/IocomeTypeSegment";
import { ValiditySegment } from "../../../components/ui/segment/ValiditySegment";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { errorPopup, successPopup } from "../../../function/successPopup";

export const CategoryEdit = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputCategoryName, setInputCategoryName] = useState<string>("");
  const [inputIocomeType, setInputIocomeType] = useState<IocomeType>(IocomeType.Income);
  const [inputGenreId, setInputGenreId] = useState<string | null>("");
  const [inputIsValid, setInputIsValid] = useState<boolean>(true);
  const [inputDisplayOrder, setInputDisplayOrder] = useState<number | "">(0);

  // カテゴリデータの取得
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const data = await getCategoryById({ categoryId });
        setCategoryData(data);

        // 取得したデータで状態を初期化
        setInputCategoryName(data.categoryName);
        setInputIocomeType(data.genre.iocomeType);
        setInputGenreId(data.genre.genreId);
        setInputIsValid(data.validFlag);
        setInputDisplayOrder(data.displayOrder);
      } catch (e) {
        console.error(e);
        errorPopup("カテゴリの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const updateHandler = async () => {
    try {
      await updateCategoryById({
        categoryId,
        categoryName: inputCategoryName,
        genreId: inputGenreId as string,
        validFlag: inputIsValid,
        displayOrder: Number(inputDisplayOrder),
      });
      successPopup("更新しました");

      // カテゴリ一覧ページに戻り、一覧を更新する
      router.push("/household/setting/category");
      router.refresh(); // ページをリフレッシュして一覧を更新
    } catch (e) {
      errorPopup("更新に失敗しました");
      console.error(e);
    }
  };

  // 収支区分が変更された場合、ジャンルをリセット
  useEffect(() => {
    if (categoryData && inputIocomeType !== categoryData.genre.iocomeType) {
      setInputGenreId(null);
    }
  }, [inputIocomeType, categoryData]);

  if (loading) return <div>Loading....</div>;

  return (
    <div className={"w-full p-2"}>
      <Frame title={"カテゴリ名"}>
        <GenreNameTextInput genreName={inputCategoryName} setGenreName={setInputCategoryName} />
      </Frame>
      <Frame title={"収支区分"}>
        <IocomeTypeSegment iocomeType={inputIocomeType} onChange={setInputIocomeType} />
      </Frame>
      <Frame title={"ジャンル"}>
        <GenreSelect
          genreId={inputGenreId}
          onChange={setInputGenreId}
          iocomeType={inputIocomeType}
        />
      </Frame>
      <Frame title={"有効・無効"}>
        <ValiditySegment isValid={inputIsValid} onChange={setInputIsValid} />
      </Frame>
      <Frame title={"表示順"}>
        <DisplayOrderInput value={inputDisplayOrder} onChange={setInputDisplayOrder} />
      </Frame>

      <Button onClick={updateHandler} type={"modify"} label={"更新"} />
    </div>
  );
};

const Frame = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={"my-4 rounded bg-gray-100 p-4"}>
    <div className={"text-gray-500"}>{title}</div>
    <div className={"ml-[1em] text-xl"}>{children}</div>
  </div>
);
