import { Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import { type FC, useMemo } from "react";

import type { ComboBoxProps } from "./index";

export const MantineComboBox: FC<ComboBoxProps> = ({ value, setValue, data, label }) => {
  const labelMap = useMemo(
    () => Object.fromEntries(Object.values(data).flatMap((v) => v.map((w) => [w.value, w.label]))),
    [data],
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val],
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()} label={label}>
          <Pill.Group>
            {value.map((v) => (
              <Pill key={v} withRemoveButton onRemove={() => handleValueRemove(v)}>
                {labelMap[v]}
              </Pill>
            ))}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options mah={400} style={{ overflowY: "auto" }}>
          {Object.entries(data).map(([group, v]) => (
            <Combobox.Group key={group} label={group}>
              {v.map((item) => (
                <Combobox.Option key={item.value} value={item.value}>
                  {item.label}
                </Combobox.Option>
              ))}
            </Combobox.Group>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
