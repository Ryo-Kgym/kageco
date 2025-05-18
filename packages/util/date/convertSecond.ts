export const convertSecondToMinute = (
  second: number | undefined,
  alternativeValue = "",
) => {
  if (second === undefined) {
    return {
      minute: undefined,
      second: undefined,
      mmss: alternativeValue,
    };
  }

  const mm = Math.floor(second / 60);
  const ss = Math.floor(second % 60);

  return {
    minute: mm,
    mmss: `${mm.toString().padStart(3, "0")}:${ss.toString().padStart(2, "0")}`,
  };
};

export const convertSecondToHour = (
  second: number | undefined,
  alternativeValue = "",
) => {
  if (second === undefined) {
    return {
      hour: undefined,
      minute: undefined,
      second: undefined,
      hhmmss: alternativeValue,
    };
  }

  const hh = Math.floor(second / 3600);
  const mm = Math.floor((second % 3600) / 60);
  const ss = Math.floor(second % 60);

  return {
    hhmmss: `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`,
    hhmm: `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`,
  };
};
