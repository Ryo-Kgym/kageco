/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

import { IocomeTotalPresenter } from "./IocomeTotalPresenter";

export const IocomeTotalContainer = ({
  income = 0,
  outcome = 0,
}: {
  income: number | undefined;
  outcome: number | undefined;
}) => {
  const hidden = income === 0 && outcome === 0;

  return <IocomeTotalPresenter income={income} outcome={outcome} hidden={hidden} />;
};
