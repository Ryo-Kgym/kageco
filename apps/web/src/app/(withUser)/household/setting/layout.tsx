import { RoutingTabs } from "../../../../components/ui/RoutingTabs";
import { paths } from "../../../../routing/paths";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RoutingTabs
    defaultValue={"genre"}
    tabs={[
      {
        value: "genre",
        label: "ジャンル",
        url: paths.household.setting.genre,
      },
      {
        value: "category",
        label: "カテゴリ",
        url: paths.household.setting.category,
      },
      {
        value: "categoryAdd",
        label: "カテゴリ登録",
        url: paths.household.setting.categoryAdd,
      },
      {
        value: "tag",
        label: "タグ",
        url: paths.household.setting.tag,
      },
      {
        value: "template",
        label: "テンプレート",
        url: paths.household.setting.template,
      },
      {
        value: "batch",
        label: "バッチ",
        url: paths.household.setting.batch,
      },
    ]}
  >
    {children}
  </RoutingTabs>
);

export default Layout;
