/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

"use client";

import { Tabs } from "@mantine/core";

import { useState } from "react";
import type { TabsProps } from "./index";

const normalClassName = "";
const mobileClassName = "max-sm:text-sm max-sm:h-5 max-sm:p-0";

export const MantineTabs = ({ defaultSelect, tabPropsList }: TabsProps) => {
  const [active, setActive] = useState(defaultSelect);

  return (
    <Tabs
      value={active}
      onChange={(v) => {
        v && setActive(v);
      }}
      defaultValue={defaultSelect}
      className={"w-full justify-center"}
    >
      <Tabs.List grow>
        {tabPropsList.map((tab, i) => (
          <Tabs.Tab
            value={tab.value}
            leftSection={tab.icon}
            key={tab.value}
            className={`${normalClassName} ${mobileClassName}`}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabPropsList
        .filter(({ value }) => value === active)
        .map(({ value, contents }, i) => (
          <Tabs.Panel value={value} pt="lg" pb="lg" key={`panel-${value}`}>
            {contents}
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};
