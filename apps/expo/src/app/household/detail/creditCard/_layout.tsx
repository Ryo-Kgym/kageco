import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

const Layout = () => (
  <>
    <Stack.Screen options={{ title: "" }} />
    <Tabs>
      <Tabs.Screen
        name="[id]/edit"
        options={{
          title: "編集",
          tabBarIcon: ({ color }) => (
            <AntDesign name="edit" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[id]/split"
        options={{
          title: "分割",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="call-split" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  </>
);
export default Layout;
