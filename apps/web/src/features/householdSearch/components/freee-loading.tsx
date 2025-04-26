import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";

/**
 * Freee認証ロード中状態を表示するコンポーネント
 */
export const FreeeLoading: FC = () => {
  return (
    <Button
      label={"freee連携CSV出力"}
      onClick={() => {}}
      type={"add"}
      disabled={true}
    />
  );
};
