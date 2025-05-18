import { Link } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export const DashboardFrame = ({
  label,
  children,
  href,
  size,
  scroll,
  footer,
}: {
  label: string;
  children: ReactNode | ReactNode[];
  href: string;
  size: "100%" | "50%" | "25%";
  scroll?: number;
  footer?: ReactNode;
}) =>
  scroll ? (
    <View className={"px-1 py-0.5"} style={{ width: size }}>
      <View
        className={"rounded-2xl border-2 bg-neutral-50 p-3 shadow-sm"}
        style={{
          borderColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Pressable>
          <Link href={href as "/"}>
            {label && <Text className={"text-lg"}>{label}</Text>}
          </Link>
        </Pressable>
        <ScrollView style={{ maxHeight: scroll }}>
          <Pressable>
            <Link href={href as "/"}>{children}</Link>
          </Pressable>
        </ScrollView>
        {footer}
      </View>
    </View>
  ) : (
    <Pressable className={"px-1 py-0.5"} style={{ width: size }}>
      <Link href={href as "/"}>
        <View
          className={
            "min-w-full rounded-2xl border-2 bg-neutral-50 p-3 shadow-sm"
          }
          style={{
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          {label && <Text className={"text-lg"}>{label}</Text>}
          {children}
        </View>
      </Link>
      {footer}
    </Pressable>
  );
