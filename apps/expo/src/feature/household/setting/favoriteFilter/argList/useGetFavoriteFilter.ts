import { useGetFavoriteFilterQuery } from "@v3/graphql/household";

import type { IocomeType } from "~/types/iocome-type";
import type { FavoriteFilterArgKey } from "../favorite-filter-type";

export const useGetFavoriteFilter = (filterId: string) => {
  const [{ data }] = useGetFavoriteFilterQuery({
    variables: { filterId },
  });

  const favoriteFilterArgs: FavoriteFilterArgsType[] =
    data?.filter?.args.map((a) => ({
      id: a.id,
      key: a.key as FavoriteFilterArgKey,
      value: a.value,
      category:
        a.key === "categoryId" && a.category
          ? {
              id: a.category.id,
              name: a.category.name,
              genre: {
                id: a.category.genre.id,
                name: a.category.genre.name,
                iocomeType: a.category.genre.iocomeType as IocomeType,
              },
            }
          : undefined,
    })) ?? [];

  const convertValue = ({ key, value, category }: FavoriteFilterArgsType) => {
    if (category && key === "categoryId") {
      return `${category.genre.name} - ${category.name}`;
    }
    return value;
  };

  const getFavoriteFilterArgs = () =>
    favoriteFilterArgs.map((a) => ({
      ...a,
      label: convertValue({
        ...a,
      }),
    }));

  return { getFavoriteFilterArgs };
};

type FavoriteFilterArgsType = {
  id: string;
  key: FavoriteFilterArgKey;
  value: string;
  category?: {
    id: string;
    name: string;
    genre: {
      id: string;
      name: string;
      iocomeType: IocomeType;
    };
  };
};
