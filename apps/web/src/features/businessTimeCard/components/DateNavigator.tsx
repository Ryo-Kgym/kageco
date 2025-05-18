"use client";

import type { YYYY_MM_DD } from "@/util/date/date";
import type { FC } from "react";

type Props = {
  baseDate: YYYY_MM_DD;
};

export const DateNavigator: FC<Props> = ({ baseDate }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <span>{baseDate}</span>
    </div>
  );
};
