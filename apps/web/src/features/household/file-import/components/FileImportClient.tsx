"use client";

import { type FC, useState } from "react";

import type { ImportFileType } from "../types/importFileType";
import { FileTypeInput } from "./FileTypeInput";
import { FileImportForm } from "./form/FileImportForm";
import { FileImportColumnMapping } from "./setting/FileImportColumnMapping";
import { FileImportSetting } from "./setting/FileImportSetting";

export const FileImportClient: FC = () => {
  const [importFileType, setImportFileType] =
    useState<ImportFileType>("creditCsv");

  return (
    <div className={"flex"}>
      <div className={"h-full w-48 space-y-10 p-2"}>
        <FileTypeInput
          importFileType={importFileType}
          setFileType={setImportFileType}
        />
        <FileImportSetting />
        <FileImportColumnMapping importFileType={importFileType} />
      </div>
      <div className={"h-full flex-1"}>
        <FileImportForm importFileType={importFileType} />
      </div>
    </div>
  );
};
