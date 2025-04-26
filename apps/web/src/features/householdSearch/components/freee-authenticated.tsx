import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";

interface FreeeAuthenticatedProps {
  handleExportClick: () => Promise<void>;
  handleLogoutClick: () => void;
  isLoading: boolean;
}

/**
 * Freee認証済み状態を表示するコンポーネント
 */
export const FreeeAuthenticated: FC<FreeeAuthenticatedProps> = ({
  handleExportClick,
  handleLogoutClick,
  isLoading,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        label={"freee連携CSV出力"}
        onClick={handleExportClick}
        type={"add"}
        disabled={isLoading}
      />
      <Button
        label={"連携解除"}
        onClick={handleLogoutClick}
        type={"dangerous"}
        disabled={isLoading}
      />
    </div>
  );
};
