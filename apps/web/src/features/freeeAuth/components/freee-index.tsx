import type { FC } from "react";

/**
 * freee連携のインデックスコンポーネント
 */
export const FreeeIndex: FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">freee連携機能</h2>
      <p className="mb-4">このセクションでは、freeeとの連携機能を提供しています。</p>
      <ul className="list-disc pl-5 mb-4">
        <li className="mb-2">
          <a href="/household/freee/insert" className="text-blue-600 hover:underline">
            freee取引登録
          </a>
          <p className="text-sm text-gray-600 mt-1">家計簿データをfreeeの取引として登録します。</p>
        </li>
      </ul>
    </div>
  );
};
