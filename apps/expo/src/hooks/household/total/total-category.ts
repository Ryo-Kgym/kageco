type BaseType = {
  categoryId: string;
  categoryName: string;
};

export type WithAmountType = { amount: number } & BaseType;

export const totalCategory = <T extends WithAmountType>({
  details,
  filter = () => true,
}: {
  details: T[];
  filter?: (d: T) => boolean;
}): WithAmountType[] => {
  const categoryList = details
    .filter(filter)
    .filter((x, i, arr) => arr.findIndex((y) => y.categoryId === x.categoryId) === i)
    .map(
      ({ categoryId, categoryName }) =>
        ({
          categoryId,
          categoryName,
        }) as BaseType,
    );

  return categoryList.map((c) => {
    const total = details
      .filter((d) => d.categoryId === c.categoryId)
      .filter(filter)
      .reduce((acc, cur) => acc + cur.amount, 0);

    return {
      ...c,
      amount: total,
    };
  });
};
