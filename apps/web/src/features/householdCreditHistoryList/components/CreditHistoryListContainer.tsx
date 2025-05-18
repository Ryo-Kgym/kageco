/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

"use client";

import type { YYYY_MM_DD } from "@/util/date/date";
import { useRouter } from "next/navigation";
import type { FC } from "react";

import type { TableProps } from "../../../components/atoms/Table";
import { FormatPrice } from "../../../components/molecules/FormatPrice";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { CreditHistoryListPresenter } from "./CreditHistoryListPresenter";

type Props = {
  creditHistoryList: {
    id: string;
    withdrawalDate: YYYY_MM_DD;
    creditCard: string;
    accountName: string;
    totalAmount: number;
  }[];
};

export const CreditHistoryListContainer: FC<Props> = ({
  creditHistoryList,
}) => {
  const { push } = useRouter();

  const showDetailPage = (summaryId: string) => {
    push(`/household/creditCard/${summaryId}`);
  };

  const tableProps: TableProps[] = creditHistoryList.map((history) => ({
    keyPrefix: "creditCard",
    columns: [
      { value: history.withdrawalDate, align: "center" },
      { value: history.creditCard, align: "center" },
      {
        value: history.accountName,
      },
      {
        value: (
          <FormatPrice
            price={history.totalAmount as number}
            iocomeType={IocomeType.Outcome}
          />
        ),
        align: "right",
      },
    ],
    onClick: () => {
      showDetailPage(history.id);
    },
  }));

  return <CreditHistoryListPresenter tableProps={tableProps} />;
};
