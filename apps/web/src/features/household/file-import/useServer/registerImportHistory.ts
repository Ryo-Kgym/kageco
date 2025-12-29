"use server";

import { TZDateTime } from "@/util/date/date";
import { generateId } from "@/util/generateId";
import { CreateImportFileHistoryDocument } from "@v3/graphql/household/schema/mutation/create/CreateImportFileHistory.generated";

import { findUser } from "../../../../persistence/browser/server/find-user";
import { execMutation } from "../../../../persistence/database/server/execMutation";
import type { LoadFileProps } from "../types";
import type { ImportFileType } from "../types/importFileType";

export const registerImportHistory = async ({
  importFileType,
  fileName,
  loadData,
}: {
  importFileType: ImportFileType;
  fileName: string;
  loadData: LoadFileProps[];
}) => {
  const fileImportId = generateId();
  const {
    id: importUserId,
    group: { id: groupId },
  } = await findUser();
  await execMutation(CreateImportFileHistoryDocument, {
    id: fileImportId,
    fileType: importFileType,
    fileName,
    importUserId,
    importDatetime: TZDateTime.valueOf(new Date()).toString(),
    groupId,
    importContents: loadData,
  });

  return { fileImportId };
};
