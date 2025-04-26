"use client";

import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";

export const FreeeCsvExportButton: FC = () => {
  const handleClick = () => {
    // Functionality will be implemented later
    console.log("freee連携CSV出力 button clicked");
  };

  return (
    <Button label={"freee連携CSV出力"} onClick={handleClick} type={"add"} />
  );
};
