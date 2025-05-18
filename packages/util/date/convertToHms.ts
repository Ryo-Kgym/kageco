import jaDayjs from "./locale/ja-dayjs";

export const convertToHms = (date: Date | undefined, alternativeValue = "") => {
  if (date === undefined) {
    return alternativeValue;
  }

  return jaDayjs.toInstance(date).format("HH:mm:ss");
};
