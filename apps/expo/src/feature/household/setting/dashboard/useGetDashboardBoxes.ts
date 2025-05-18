import { useGetDashboardSettingQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";
import { generateBox } from "./generate-box";
import type {
  ArgsMapType,
  ArgsType,
  Feature,
  GenreParamType,
  IocomeParamType,
} from "./type";

export const useGetDashboardBoxes = () => {
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();

  const [{ data }] = useGetDashboardSettingQuery({
    variables: {
      userId,
      groupId,
    },
  });

  const getSettings = () =>
    data?.setting.map((s) => ({
      id: s.id,
      feature: s.feature as Feature,
      order: s.order,
      argsMap: s.args.map((a) => valueConverter[a.type as ArgsType](a.value)),
    })) ?? [];

  const getBoxNodes = (): React.ReactNode[] => generateBox(getSettings());

  return { getBoxNodes, getSettings };
};

const valueConverter: {
  [type in ArgsType]: (value: string) => ArgsMapType;
} = {
  year: (value: string) => ({
    type: "year",
    value: Number(value),
  }),
  month: (value: string) => ({
    type: "month",
    value: Number(value),
  }),
  genreType: (value: string) => ({
    type: "genreType",
    value: value as GenreParamType,
  }),
  iocomeType: (value: string) => ({
    type: "iocomeType",
    value: value as IocomeParamType,
  }),
  filterId: (value: string) => ({
    type: "filterId",
    value,
  }),
};
