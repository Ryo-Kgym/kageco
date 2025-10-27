import type { YYYY_MM_DD_HH_MM_SS } from "./date";

export const formatToYmdhms = (date: Date): YYYY_MM_DD_HH_MM_SS => {
  const yyyy = date.getUTCFullYear();
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = date.getUTCDate().toString().padStart(2, "0");

  const hh = date.getUTCHours().toString().padStart(2, "0");
  const min = date.getUTCMinutes().toString().padStart(2, "0");
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z` as YYYY_MM_DD_HH_MM_SS;
};
