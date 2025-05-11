import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export const AppListPresenter = ({
  apps,
}: {
  apps: { appName: string; path: string }[];
}) => (
  <FlatList
    data={apps}
    renderItem={({ item: app }) => (
      <Pressable
        className={
          "rounded-2xl border-2 border-gray-500 bg-neutral-50 shadow-sm mb-2"
        }
      >
        <Link href={app.path as `./`}>
          <View className={"items-center p-5"}>
            <Text className={"text-xl"}>{app.appName}</Text>
          </View>
        </Link>
      </Pressable>
    )}
  />
);
