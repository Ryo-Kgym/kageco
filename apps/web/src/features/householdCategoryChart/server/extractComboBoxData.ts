import type { ComboBox } from "../../../components/ui/v4/comboBox";
import type { CategoryChartData } from "../types";

export const extractComboBoxData = (data: CategoryChartData) =>
  Object.entries(data).reduce<Parameters<typeof ComboBox>[0]["data"]>((acc, [categoryId, attr]) => {
    const genreName = attr.genreName;

    if (!acc[genreName]) {
      return {
        ...acc,
        [genreName]: [
          {
            value: categoryId,
            label: attr.categoryName,
          },
        ],
      };
    }

    return {
      ...acc,
      [genreName]: [
        ...acc[genreName],
        {
          value: categoryId,
          label: attr.categoryName,
        },
      ],
    };
  }, {});
