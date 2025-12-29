import { useEffect, useState } from "react";

export const useBuildTable = (loadFile: string) => {
  const [buildableState, setBuildableState] = useState<boolean>(false);
  const [headerState, setHeaderState] = useState<string[]>([]);
  const [bodyState, setBodyState] = useState<string[][]>([]);

  useEffect(() => {
    const rows = loadFile.split("\n");
    const optionalHeader = rows[0]?.split(",");

    if (!optionalHeader?.length) {
      setBuildableState(false);
      return;
    }

    setBuildableState(true);
    setHeaderState(optionalHeader.map((h) => h.replaceAll('"', "")));
    setBodyState(
      rows.slice(1).map((r) => {
        return r.split(",").map((c) => c.replaceAll('"', ""));
      }),
    );
  }, [loadFile]);

  return {
    buildable: buildableState,
    header: headerState,
    body: bodyState,
  };
};
