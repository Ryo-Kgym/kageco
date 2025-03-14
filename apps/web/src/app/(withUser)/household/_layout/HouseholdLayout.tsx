import type { ReactNode } from "react";

import { RegisterDailyButtonServer } from "../../../../features/householdRegisterDaily/components/RegisterDailyButtonServer";
import { paths } from "../../../../routing/paths";
import { NavbarSection } from "../../../_layout/NavbarSection";
import type { Navi } from "../../../_layout/navi";

export const HouseholdLayout = ({ children }: { children: ReactNode }) => (
  <div className={"bg-white text-black"}>
    <NavbarSection header={"家計簿アプリ"} naviArray={householdMenu}>
      {children}
      <div className={"absolute bottom-16 left-12 z-[110]"}>
        <RegisterDailyButtonServer />
      </div>
    </NavbarSection>
  </div>
);

const householdMenu: Navi[] = [
  {
    label: "戻る",
    url: paths.group.select,
  },
  {
    label: "ダッシュボード",
    url: paths.household.dashboard,
  },
  {
    label: "収支予測",
    url: paths.household.forecast,
  },
  {
    label: "残高チャート",
    url: paths.household.balanceChart,
  },
  {
    label: "カテゴリチャート",
    url: paths.household.categoryChart,
  },
  {
    label: "検索",
    url: paths.household.search,
  },
  {
    label: "月別サマリ",
    url: paths.household.monthlySummary.root(),
  },
  {
    label: "アカウント",
    url: paths.household.account,
  },
  {
    label: "クレカ履歴",
    url: paths.household.creditCard,
  },
  {
    label: "ファイル取込",
    url: paths.household.fileImport,
  },
  {
    label: "設定",
    url: paths.household.setting.genre,
  },
  {
    label: "タイムカード",
    url: paths.business.timecard(),
  },
];
