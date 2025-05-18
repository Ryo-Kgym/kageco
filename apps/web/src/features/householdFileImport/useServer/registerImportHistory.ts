"use server";

import { TZDateTime } from "@/util/date/date";
import { CreateImportFileHistoryDocument } from "@v3/graphql/household/schema/mutation/create/CreateImportFileHistory.generated";

import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";
import type { ImportFileType } from "../types/importFileType";

export const registerImportHistory = async ({
  importFileType,
  fileName,
}: {
  importFileType: ImportFileType;
  fileName: string;
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
  });

  return { fileImportId };
};
