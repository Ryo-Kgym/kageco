import type { FC, ReactNode } from "react";

interface FreeeLayoutProps {
  children: ReactNode;
}

/**
 * freee関連ページのレイアウトコンポーネント
 */
export const FreeeLayout: FC<FreeeLayoutProps> = ({ children }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">freee連携</h1>
      {children}
    </div>
  );
};
