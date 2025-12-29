import type { FC } from "react";

import { NumberInput } from "../../../../../components/ui/numberInput/v4/NumberInput";
import { useFileImportColumnMapping } from "../../client/useFileImportColumnMapping";
import { importFileFields } from "../../types/importFileColumn";
import type { ImportFileType } from "../../types/importFileType";

type Props = {
  importFileType: ImportFileType;
};

export const FileImportColumnMapping: FC<Props> = ({ importFileType }) => {
  const { mapping, setMapping } = useFileImportColumnMapping();
  const decorator = importFileFields[importFileType];

  return (
    <div className={"space-y-5"}>
      <span className={"font-bold"}>列のマッピング</span>
      <div className={"space-y-5"}>
        {Object.values(decorator).map(({ columnName, label }) => (
          <div key={columnName}>
            <div>
              <NumberInput
                label={label}
                value={mapping[columnName] ?? ""}
                setValue={(value) => {
                  if (value === "") {
                    setMapping(columnName, null);
                    return;
                  }

                  setMapping(columnName, value);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
