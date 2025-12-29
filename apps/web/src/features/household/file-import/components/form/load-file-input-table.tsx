import type { ComponentProps, FC } from "react";

import { DataTable, Table } from "../../../../../components/ui/v4/table";
import { useFileImportColumnMapping } from "../../client/useFileImportColumnMapping";
import type { ImportFileType } from "../../types/importFileType";
import { LoadFileInputRow } from "./load-file-input-row";

type Props = {
  importFileType: ImportFileType;
  visible: boolean;
  header: string[];
  body: string[][];
  default: ComponentProps<typeof LoadFileInputRow>["default"];
};

export const LoadFileInputTable: FC<Props> = ({
  importFileType,
  visible,
  header,
  body,
  default: defaultProps,
}) => {
  const { mapping } = useFileImportColumnMapping();

  return (
    <Table>
      <Table.Header
        headerItems={[{ name: "#" }]
          .concat(
            header.map((name, index) => {
              const columnNumber = index + 1;
              const [columnName] = Object.entries(mapping).find(
                ([, value]) => value === columnNumber,
              ) ?? [null, null];

              return {
                name: columnName ? `[${columnName}]` : `${index + 1}:${name}`,
              };
            }),
          )
          .concat({ name: "ジャンル" })
          .concat({ name: "カテゴリ" })
          .concat({ name: "メモ" })}
      />
      <Table.Body
        data={visible ? body : []}
        renderItem={(item, rowNumber) => (
          <LoadFileInputRow
            key={rowNumber}
            importFileType={importFileType}
            item={item}
            rowNumber={rowNumber}
            default={defaultProps}
          />
        )}
      />
    </Table>
  );
};
