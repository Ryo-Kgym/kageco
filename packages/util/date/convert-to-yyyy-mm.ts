/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

export const convertToYyyyMm = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  return `${yyyy}-${mm.toString().padStart(2, "0")}`;
};
