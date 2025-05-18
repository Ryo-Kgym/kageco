import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

const Layout = () => (
  <>
    <Stack.Screen options={{ title: "" }} />
    <Tabs>
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "ダッシュボード",
          tabBarIcon: ({ color }) => (
            <AntDesign name="dashboard" size={30} color={color} />
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
      <Tabs.Screen
        name="setting/index"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  </>
);
export default Layout;
