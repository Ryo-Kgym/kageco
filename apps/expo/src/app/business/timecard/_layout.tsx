import { Stack, Tabs } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

/**
 * 勤怠管理ページのタブレイアウト
 * 出勤・退勤ボタンと勤怠記録をタブで分ける
 */
const Layout = () => (
  <>
    <Stack.Screen options={{ title: "勤怠管理" }} />
    <Tabs>
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
    </Tabs>
  </>
);

export default Layout;