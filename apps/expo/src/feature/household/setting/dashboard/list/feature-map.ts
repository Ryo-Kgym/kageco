import type { ArgsType, Feature } from "~/feature/household/setting/dashboard/type";

export const featureMap: {
  [feature in Feature]: {
    label: string;
    argsTypes: ArgsType[];
  };
} = {
  register: {
    label: "記帳",
    argsTypes: [],
  },
  balance: {
    label: "残高",
    argsTypes: [],
  },
  favoriteFilter: {
    label: "お気に入り条件",
    argsTypes: ["filterId"],
  },
  yearly: {
    label: "年間収支",
    argsTypes: ["year"],
  },
  monthly: {
    label: "月間収支",
    argsTypes: ["month"],
  },
  monthlyCategory: {
    label: "月間カテゴリ",
    argsTypes: ["genreType", "iocomeType", "month"],
  },
  setting: {
    label: "設定",
    argsTypes: [],
  },
  reload: {
    label: "更新",
    argsTypes: [],
  },
};
