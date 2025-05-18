import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons/";
import { Stack, Tabs } from "expo-router";

const Layout = () => (
  <>
    <Stack.Screen options={{ title: "" }} />
    <Tabs>
      <Tabs.Screen
        name="calendar/[date]"
        options={{
          title: "カレンダー",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color={color} />
          ),
          href: `/household/calendar/${new Date().toISOString().slice(0, 10)}`,
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: "アカウント",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bank" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register/index"
        options={{
          title: "登録",
          tabBarIcon: ({ color }) => (
            <Entypo name="pencil" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  </>
);
export default Layout;
