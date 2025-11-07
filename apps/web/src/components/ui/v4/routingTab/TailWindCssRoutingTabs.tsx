"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { RoutingTabsProps } from "./index";

/**
 * @package
 */
export const TailWindCssRoutingTabs = ({ tabs, currentTab }: RoutingTabsProps) => {
  const pathname = usePathname();

  return (
    <div>
      <div className={"flex justify-start"}>
        {Object.entries(tabs).map(([tabName, tab]) => (
          <div
            key={tabName}
            className={`${
              tabName === currentTab ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-500"
            } cursor-pointer p-2`}
          >
            <Link href={`${pathname}?tab=${tabName}`}>{tab.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
