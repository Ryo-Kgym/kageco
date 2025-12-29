"use server";

import type { YYYY_MM_DD } from "@/util/date/date";

import { registerDailyDetail } from "../../../../useServer/household/daily_detail/registerDailyDetail";
import type { LoadFileProps } from "../types";
import type { ImportFileType } from "../types/importFileType";
import { registerCreditCardAction } from "./register-credit-card.action";
import { registerImportHistory } from "./registerImportHistory";

export const registerImportedAction = async ({
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
    loadData,
  });

  let count = 0;

  switch (importFileType) {
    case "creditCsv": {
      count = (
        await registerCreditCardAction({
          summaryId: fileImportId,
          withdrawalDate,
          accountId,
          loadData,
        })
      ).count;
      break;
    }
    case "bankCsv": {
      const results = [];
      for (const data of loadData) {
        const result = await registerDailyDetail({
          ...data,
          date: data.date,
          accountId,
        });
        results.push(result);
      }

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
