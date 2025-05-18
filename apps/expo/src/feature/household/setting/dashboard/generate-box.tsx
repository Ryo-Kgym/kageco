import type { GenreType } from "~/types/genre-type";
import type { IocomeType } from "~/types/iocome-type";
import { featureSetting } from "./feature-setting";
import type { ArgsMapType, SettingProps } from "./type";

export const generateBox = (
  settingPropsList: SettingProps[],
): React.ReactNode[] =>
  settingPropsList.map(({ feature, argsMap, id }, index) => {
    const { component: Component, argsTypes } = featureSetting[feature];
    const props = {};

    if (argsTypes.includes("year")) {
      appendProps({
        settingId: id,
        argsMap,
        props,
        key: "year",
        parseToProps: ({ value }) => {
          const year = new Date();
          year.setFullYear(year.getFullYear() + (value as number));
          return year;
        },
      });
    }

    if (argsTypes.includes("month")) {
      appendProps({
        settingId: id,
        argsMap,
        props,
        key: "month",
        parseToProps: ({ value }) => {
          const month = new Date();
          month.setMonth(month.getMonth() + (value as number));
          return month;
        },
      });
    }

    if (argsTypes.includes("genreType")) {
      appendProps({
        settingId: id,
        argsMap,
        props,
        key: "genreType",
        parseToProps: ({ value }): GenreType[] => {
          if (value === "FXD") return ["FIXED"];
          if (value === "FLC") return ["FLUCTUATION"];
          return ["FIXED", "FLUCTUATION"];
        },
      });
    }

    if (argsTypes.includes("iocomeType")) {
      appendProps({
        settingId: id,
        argsMap,
        props,
        key: "iocomeType",
        parseToProps: ({ value }): IocomeType[] => {
          if (value === "I") return ["INCOME"];
          if (value === "O") return ["OUTCOME"];
          return ["INCOME", "OUTCOME"];
        },
      });
    }

    if (argsTypes.includes("filterId")) {
      appendProps({
        settingId: id,
        argsMap,
        props,
        key: "filterId",
        parseToProps: ({ value }) => value,
      });
    }

    return <Component key={index.toString()} {...props} />;
  });

const appendProps = ({
  settingId,
  props,
  argsMap,
  key,
  parseToProps,
}: {
  settingId: string;
  props: unknown;
  argsMap: ArgsMapType[];
  key: string;
  parseToProps: (argsMapType: ArgsMapType) => unknown;
}) => {
  const argsMapType = argsMap.filter((arg) => arg.type === key)?.[0];
  if (!argsMapType)
    throw new Error(`${key} type is required for settingId: ${settingId}`);

  return Object.defineProperty(props, key, {
    value: parseToProps(argsMapType),
    enumerable: true,
  });
};
