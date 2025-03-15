"use client";

import { type FC, useState } from "react";

import { FieldContainer } from "../v4/FieldContainer";
import { Tag } from "./Tag";
import styles from "./TagInput.module.scss";

type Props = {
  values: string[];
  onChange: (values: string[]) => void;
  data: {
    label: string;
    value: string;
    colorCode: string;
  }[];
};

export const TagInput: FC<Props & { label?: string }> = ({
  values: selected,
  onChange: setSelected,
  data,
  label = "",
}) => {
  return (
    <FieldContainer label={label}>
      <TagInputCore values={selected} onChange={setSelected} data={data} />
    </FieldContainer>
  );
};

export const TagInputCore: FC<Props> = ({
  values: selected,
  onChange: setSelected,
  data,
}) => {
  const [openSelect, setOpenSelect] = useState(false);

  const dataObject = Object.fromEntries(
    data.map((tag) => [
      tag.value,
      { label: tag.label, colorCode: tag.colorCode },
    ]),
  );

  return (
    <div className={styles.module} onMouseLeave={() => setOpenSelect(false)}>
      <button
        type="button"
        className={styles.input}
        onMouseOver={() => setOpenSelect(true)}
        onFocus={() => setOpenSelect(true)}
      >
        {selected.map((tag) => (
          <Tag
            key={tag}
            label={dataObject[tag]?.label ?? ""}
            colorCode={dataObject[tag]?.colorCode ?? ""}
          />
        ))}
      </button>
      {openSelect && (
        <ul className={styles.selector}>
          {data.map((tag) => (
            <li key={tag.value}>
              <TagInputCheckbox
                id={tag.value}
                label={tag.label}
                checked={selected.includes(tag.value)}
                onChange={() => {
                  if (selected.includes(tag.value)) {
                    setSelected(selected.filter((t) => t !== tag.value));
                  } else {
                    setSelected([...selected, tag.value]);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TagInputCheckbox: FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, label, checked, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    <label htmlFor={id} style={{ whiteSpace: "nowrap" }}>
      {label}
    </label>
  </div>
);
