/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import type {
  ComboboxItem,
  ComboboxItemGroup,
} from "@mantine/core/lib/components/Combobox/Combobox.types";

export { MantineV7Select as Select } from "./MantineV7Select";
export { ModalTableSelect } from "./ModalTableSelect";

export type SelectData = ComboboxItem | ComboboxItemGroup;
