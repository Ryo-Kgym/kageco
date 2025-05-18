"use server";

import type { YYYY_MM_DD } from "@/util/date/date";

import { registerDailyDetail } from "../../../useServer/household/daily_detail/registerDailyDetail";
import type { LoadFileProps } from "../types";
import type { ImportFileType } from "../types/importFileType";
import { registerCreditCard } from "./registerCreditCard";
import { registerImportHistory } from "./registerImportHistory";

export const registerImported = async ({
  importFileType,
  fileName,
  withdrawalDate,
  accountId,
  loadData,
}: {
  importFileType: ImportFileType;
  fileName: string;
  withdrawalDate: YYYY_MM_DD;
  accountId: string;
  loadData: LoadFileProps[];
}) => {
  const { fileImportId } = await registerImportHistory({
    importFileType,
    fileName,
  });

  let count = 0;

  switch (importFileType) {
    case "creditCsv": {
      count = (
        await registerCreditCard({
          summaryId: fileImportId,
          withdrawalDate,
          accountId,
          loadData,
        })
      ).count;
      break;
    }
    case "bankCsv": {
      const results = await Promise.all(
        loadData.map(
          async (data) =>
            await registerDailyDetail({
              ...data,
              date: data.date,
              accountId,
            }),
        ),
      );

      count = results.length;
      break;
    }
    default: {
      ((_: never) => {
        // noop
      })(importFileType);
    }
  }

  return { count };
};
