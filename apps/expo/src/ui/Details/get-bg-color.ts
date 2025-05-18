import { colorSetting } from "../Color/color-setting";
import { detailSetting } from "./detail-setting";
import type { DetailType } from "./detail-type";

export const getBgColor = (type: DetailType | undefined) => {
  if (!type) return colorSetting.default.bg;
  const color = detailSetting[type].color;
  return colorSetting[color].bg;
};
