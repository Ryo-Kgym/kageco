import type { FC } from "react";

import { RadioButtonGroup } from "../../../../components/ui/radiobutton/v5/RadioButtonGroup";
import type { ImportFileType } from "../types/importFileType";

export const FileTypeInput: FC<{
  importFileType: ImportFileType;
  setFileType: (v: ImportFileType) => void;
}> = ({ importFileType, setFileType }) => {
  return (
    <RadioButtonGroup
      id="fileType"
      value={importFileType}
      onChange={setFileType}
      label="ファイル種別"
      data={[
        { label: "クレジットカード", value: "creditCsv" },
        { label: "銀行", value: "bankCsv" },
      ]}
      orientation="vertical"
    />
  );
};
