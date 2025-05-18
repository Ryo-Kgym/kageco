import { useGetValidCategoryByGenreIdQuery } from "@v3/graphql/household";
import { useEffect } from "react";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { EditableProps } from "~/ui/editable/editable-props";
import { Picker } from "../Picker";

export const EditableCategory = ({
  value,
  setValue,
  genreId,
}: EditableProps<string> & {
  genreId: string;
}) => {
  const { groupId } = useSaveGroupId();

  const [{ data }] = useGetValidCategoryByGenreIdQuery({
    variables: {
      groupId,
      genreId,
    },
  });

  const categories =
    data?.genre?.categories.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!value && categories[0]) {
      setValue(categories[0].value);
    }
  }, [categories]);

  return (
    <Picker
      title={"カテゴリ"}
      value={value}
      setValue={setValue}
      data={categories}
    />
  );
};
