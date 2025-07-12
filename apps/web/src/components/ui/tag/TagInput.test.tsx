import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test } from "vitest";

import { TagInput } from "./TagInput";

describe("TagInput", () => {
  test("選択したものが入力欄に表示される。さらに、選択中のものをクリックすると、入力欄から取り除かれる", async () => {
    render(<TestTagInput />);

    await userEvent.hover(screen.getByRole("button"));
    expect(document.querySelector("ul")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("タグ2"));
    await userEvent.click(screen.getByLabelText("タグ3"));

    const expected1 = ["タグ2", "タグ3"];
    screen.getAllByTestId("tag").forEach((element) => {
      expect(element).toHaveTextContent(expected1.shift() ?? "");
    });
    await userEvent.click(screen.getByLabelText("タグ3"));
    const expected2 = ["タグ2"];
    screen.getAllByTestId("tag").forEach((element) => {
      expect(element).toHaveTextContent(expected2.shift() ?? "");
    });
  });
});

const data = [
  {
    label: "タグ1",
    value: "tag1",
    colorCode: "#FF0000",
  },
  {
    label: "タグ2",
    value: "tag2",
    colorCode: "#00FF00",
  },
  {
    label: "タグ3",
    value: "tag3",
    colorCode: "#0000FF",
  },
];

const TestTagInput = () => {
  const [values, setValues] = useState<string[]>([]);
  return <TagInput values={values} onChange={setValues} data={data} />;
};
