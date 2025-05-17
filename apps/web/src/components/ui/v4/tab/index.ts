import type { JSX } from "react";

export { TailWindCssTabs as Tabs } from "./TailWindCssTabs";

/**
 * @package
 */ export type TabsProps<T extends string = string> = {
  tabs: Record<T, { label: string; Component: JSX.Element }>;
  defaultTab: T;
};
