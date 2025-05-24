import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

/**
 * 勤怠管理ページのタブレイアウト
 * 出勤・退勤ボタン、勤怠記録、月次計画をタブで分ける
 */
const Layout = () => (
  <>
    <Stack.Screen options={{ title: "勤怠管理" }} />
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // hrefをnullに設定
        }}
      />
      <Tabs.Screen
        name="button/index"
        options={{
          title: "出退勤",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clock" size={24} color={color} />
          ),
          href: "/business/timecard/button",
        }}
      />
      <Tabs.Screen
        name="records/index"
        options={{
          title: "勤怠記録",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-month" size={24} color={color} />
          ),
          href: "/business/timecard/records",
        }}
      />
      <Tabs.Screen
        name="monthly-plan/index"
        options={{
          title: "月次計画",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-edit" size={24} color={color} />
          ),
          href: "/business/timecard/monthly-plan",
        }}
      />
    </Tabs>
  </>
);

export default Layout;
