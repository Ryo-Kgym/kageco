"use client";

import type { FC, ReactNode } from "react";
import { SortFrequentlyUsedCategoriesButton } from "./buttons/SortFrequentlyUsedCategoriesButton";

export const BatchClient: FC = () => {
  return (
    <div className="w-full p-2">
      <h1 className="text-2xl font-bold mb-4">バッチ処理</h1>

      <Frame title="カテゴリ管理">
        <div className="space-y-4">
          <div>
            <p className="mb-2">
              カテゴリを使用頻度順に並び替えます。よく使うカテゴリが上位に表示されるようになります。
            </p>
            <SortFrequentlyUsedCategoriesButton />
          </div>
        </div>
      </Frame>
    </div>
  );
};

const Frame = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="my-4 rounded bg-gray-100 p-4">
    <div className="text-gray-500">{title}</div>
    <div className="ml-[1em]">{children}</div>
  </div>
);
