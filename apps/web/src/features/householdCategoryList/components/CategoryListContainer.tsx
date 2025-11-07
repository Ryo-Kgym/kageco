"use client";

import { useRouter } from "next/navigation";
import type { FC } from "react";

import { ValidityStatus } from "../../../components/atoms";
import type { TableProps } from "../../../components/atoms/Table";
import { CategoryListPresenter } from "./CategoryListPresenter";

type Props = {
  categoryList: {
    id: string;
    categoryName: string;
    genreName: string;
    validFlag: boolean;
    displayOrder: number;
  }[];
};

export const CategoryListContainer: FC<Props> = ({ categoryList }) => {
  const { push } = useRouter();

  const tablePropsList: TableProps[] =
    categoryList.map(({ id: categoryId, categoryName, displayOrder, validFlag, genreName }) => ({
      keyPrefix: "category",
      columns: [
        { value: categoryName },
        { value: genreName },
        {
          value: <ValidityStatus value={validFlag ?? true} />,
          align: "center",
        },
        { value: displayOrder, align: "right" },
      ],
      onClick: () => {
        push(`/household/setting/category/edit/${categoryId}`);
      },
    })) ?? [];

  return <CategoryListPresenter tablePropsList={tablePropsList} />;
};
