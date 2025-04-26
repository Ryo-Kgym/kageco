"use client";

import { FC, ReactNode } from "react";
import { Loading } from "./Loading";

interface LoadingMaskProps {
  /**
   * マスクを表示するかどうか
   */
  isLoading: boolean;
  /**
   * マスクの下に表示する子要素
   */
  children: ReactNode;
  /**
   * マスクに表示するメッセージ（省略可）
   */
  message?: string;
}

/**
 * 画面全体をマスクするローディングコンポーネント
 * トークン取得やリダイレクト中など、ユーザー操作を一時的にブロックしたい場合に使用
 */
export const LoadingMask: FC<LoadingMaskProps> = ({
  isLoading,
  children,
  message,
}) => {
  return (
    <div className="relative">
      {children}
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Loading />
            {message && <p className="mt-2">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};