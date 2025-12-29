import { useEffect, useState } from "react";
import { decodeCsv } from "../../../../provider/file/loader/csv/loadCsvFile";
import { useImportFileSettings } from "../../../appImportFileSetting/client/useImportSettingsState";

export const useLoadFile = () => {
  const { importFileSettings } = useImportFileSettings();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loadFile, setLoadFile] = useState<string>("");
  const { encodingTo, encodingFrom, encodingType } = importFileSettings;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fn = async () => {
      if (!uploadFile) {
        setLoadFile("");
        return;
      }

      const readFile = await uploadFile.stream().getReader().read();
      const csv = decodeCsv(readFile, encodingTo, encodingFrom, encodingType);
      setLoadFile(csv);
    };
    void fn();
  }, [uploadFile]);

  return {
    uploadFile,
    onChange: setUploadFile,
    loadFile,
    setLoadFile,
  };
};
