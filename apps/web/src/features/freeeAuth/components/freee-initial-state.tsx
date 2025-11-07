import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";

interface FreeeInitialStateProps {
  handleAuthClick: () => Promise<boolean | undefined>;
  isLoading: boolean;
}

/**
 * Freee連携の初期状態を表示するコンポーネント
 */
export const FreeeInitialState: FC<FreeeInitialStateProps> = ({ handleAuthClick, isLoading }) => {
  return <Button label={"freee連携"} onClick={handleAuthClick} type={"add"} disabled={isLoading} />;
};
