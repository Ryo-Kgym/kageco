import { FileInput as MantineFileInput } from "@mantine/core";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { type FC, useState } from "react";

type Props = {
  onChange: (_: File | null) => void;
};

export const FileInput: FC<Props> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const clearFile = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <div className="relative">
      <MantineFileInput
        value={file}
        onChange={(f) => {
          setFile(f);
          onChange(f);
        }}
        placeholder="ファイルを選択してください"
        leftSection={<IconUpload size={24} />}
        size={"lg"}
        withAsterisk
        error={file === null ? "Required" : undefined}
      />
      {file && (
        <button
          onClick={clearFile}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          type="button"
          title="ファイルをクリア"
        >
          <IconTrash size={20} />
        </button>
      )}
    </div>
  );
};
