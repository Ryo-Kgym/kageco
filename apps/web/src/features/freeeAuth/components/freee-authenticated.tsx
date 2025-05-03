import type { FC, PropsWithChildren } from "react";
import { Button } from "../../../components/ui/button/v5";

type Props = {
  handleLogoutClick: () => void;
  isLoading: boolean;
};

export const FreeeAuthenticated: FC<PropsWithChildren<Props>> = ({
  children,
  handleLogoutClick,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-x-2">
      <Button
        label={"連携解除"}
        onClick={handleLogoutClick}
        type={"dangerous"}
        disabled={isLoading}
      />
      {children}
    </div>
  );
};
