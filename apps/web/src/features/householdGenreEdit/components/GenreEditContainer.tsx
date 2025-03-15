"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GenreType } from "../../../domain/model/household/GenreType";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { errorPopup, successPopup } from "../../../function/successPopup";
import type { GenreData } from "../useServer/getGenreById";
import { getGenreById } from "../useServer/getGenreById";
import { updateGenreById } from "../useServer/updateGenreById";
import { GenreEditPresenter } from "./GenreEditPresenter";

export const GenreEditContainer = ({ genreId }: { genreId: string }) => {
  const router = useRouter();
  const [genreData, setGenreData] = useState<GenreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputGenreName, setInputGenreName] = useState<string>("");
  const [inputGenreType, setInputGenreType] = useState<GenreType>(
    GenreType.FIXED,
  );
  const [inputIocomeType, setInputIocomeType] = useState<IocomeType>(
    IocomeType.Income,
  );
  const [inputIsValid, setInputIsValid] = useState<boolean>(true);
  const [inputDisplayOrder, setInputDisplayOrder] = useState<number | "">(0);

  // ジャンルデータの取得
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setLoading(true);
        const data = await getGenreById({ genreId });
        setGenreData(data);

        // 取得したデータで状態を初期化
        setInputGenreName(data.genreName);
        setInputGenreType(data.genreType);
        setInputIocomeType(data.iocomeType);
        setInputIsValid(data.validFlag);
        setInputDisplayOrder(data.displayOrder);
      } catch (e) {
        console.error(e);
        errorPopup("ジャンルの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [genreId]);

  const updateHandler = async () => {
    try {
      await updateGenreById({
        genreId,
        genreName: inputGenreName,
        genreType: inputGenreType,
        iocomeType: inputIocomeType,
        validFlag: inputIsValid,
        displayOrder: Number(inputDisplayOrder),
      });
      successPopup("更新しました");

      // ジャンル一覧ページに戻り、一覧を更新する
      router.push("/household/setting/genre");
      router.refresh(); // ページをリフレッシュして一覧を更新
    } catch (e) {
      errorPopup("更新に失敗しました");
      console.error(e);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <GenreEditPresenter
      categories={genreData?.categories || []}
      inputGenreName={inputGenreName}
      setInputGenreName={setInputGenreName}
      inputGenreType={inputGenreType}
      setInputGenreType={setInputGenreType}
      inputIocomeType={inputIocomeType}
      setInputIocomeType={setInputIocomeType}
      inputIsValid={inputIsValid}
      setInputIsValid={setInputIsValid}
      inputDisplayOrder={inputDisplayOrder}
      setInputDisplayOrder={setInputDisplayOrder}
      updateHandler={updateHandler}
    />
  );
};
