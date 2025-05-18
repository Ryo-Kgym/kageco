import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as UrqlProvider } from "urql";

import "react-native-url-polyfill/auto";
// eslint-disable-next-line import/no-relative-parent-imports
import "../styles.css";

import { datasource } from "~/config/datasource";

const Layout = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <UrqlProvider value={datasource}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffa400",
          },
        }}
      />
      <StatusBar />
    </UrqlProvider>
  </GestureHandlerRootView>
);
export default Layout;
