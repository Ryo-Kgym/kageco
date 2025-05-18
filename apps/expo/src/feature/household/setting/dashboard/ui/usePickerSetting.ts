import { useGetFavoriteFiltersQuery } from "@v3/graphql/household";

import {
  generateMonthOptions,
  generateYearOptions,
} from "~/feature/household/setting/dashboard/edit/args-value-range";
import type {
  ArgsMapType,
  ArgsType,
} from "~/feature/household/setting/dashboard/type";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";

export const usePickerSetting = () => {
  const { groupId } = useSaveGroupId();

  const [{ data }] = useGetFavoriteFiltersQuery({ variables: { groupId } });

  const pickerSetting: Record<
    ArgsType,
    {
      data: { label: string; value: ArgsMapType["value"] }[];
    }
  > = {
    year: {
      data: generateYearOptions(),
    },
    month: {
      data: generateMonthOptions(),
    },
    genreType: {
      data: [
        { label: "変動", value: "FLC" },
        { label: "固定", value: "FXD" },
        { label: "変動・固定", value: "ALL" },
      ],
    },
    iocomeType: {
      data: [
        { label: "収入", value: "I" },
        { label: "支出", value: "O" },
        { label: "収入・支出", value: "ALL" },
      ],
    },
    filterId: {
      data:
        data?.filters.map((f) => ({
          value: f.id,
          label: f.name,
        })) ?? [],
    },
  };

  return { pickerSetting };
};
