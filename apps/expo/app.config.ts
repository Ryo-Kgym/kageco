import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "kageco",
  slug: "home-helper",
  scheme: "kageco",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/kageco-icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/kageco-icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/86b12fab-9446-4883-bde4-cac8a047cdaa",
  },
  assetBundlePatterns: ["**/*"],
  runtimeVersion: "exposdk:54.0.0",
  ios: {
    runtimeVersion: "1.0.0",
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
  },
  android: {
    runtimeVersion: {
      policy: "appVersion",
    },
    package: "your.bundle.identifier",
    adaptiveIcon: {
      foregroundImage: "./assets/kageco-icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "86b12fab-9446-4883-bde4-cac8a047cdaa",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
  owner: "ryo-kgym"
});

export default defineConfig;
