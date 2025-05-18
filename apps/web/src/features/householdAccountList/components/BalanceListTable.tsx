"use client";

import type { AccountBalance } from "features/householdAccountList/types/accountBalance";
import { useState } from "react";

import { convertToYmd } from "@/util/date/convertToYmd";
import { Total } from "../../../components/molecules/Total";
import { Button } from "../../../components/ui/button/v5";
import { AccountMultipleSelect } from "../../../components/ui/select/AccountMultipleSelect";
import { DateInput } from "../../../components/ui/v4/dateInput/DateInput";
import { DataTable } from "../../../components/ui/v4/table";
import { saveAccountIds } from "../../../persistence/browser/client/saveAccountIds";
import { useNavigation } from "../../../routing/client/useNavigation";
import { useRouter } from "../../../routing/client/useRouter";

export const BalanceListTable = ({
  balanceRecords,
  total = 0,
  fromDate,
  toDate,
  accountIds,
}: {
  balanceRecords: AccountBalance[];
  total: number | undefined;
  fromDate: Date;
  toDate: Date;
  accountIds: string[];
}) => {
  const { prependParamAndPush } = useNavigation();
  const { push } = useRouter();

  const [form, setForm] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
    accountIds: string[];
  }>({
    fromDate,
    toDate,
    accountIds,
  });

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <DateInput
          label={"From"}
          value={fromDate}
          setValue={(d) => {
            setForm((prev) => ({
              ...prev,
              fromDate: d,
            }));
          }}
        />
        <DateInput
          label={"To"}
          value={toDate}
          setValue={(d) => {
            setForm((prev) => ({
              ...prev,
              toDate: d,
            }));
          }}
        />
        <AccountMultipleSelect
          accountIds={form.accountIds}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              accountIds: v,
            }))
          }
        />
        <Button
          label={"検索"}
          onClick={async () => {
            const fromDateQuery =
              form.fromDate && `fromDate=${convertToYmd(form.fromDate)}`;
            const toDateQuery =
              form.toDate && `toDate=${convertToYmd(form.toDate)}`;
            await saveAccountIds(form.accountIds);

            push(
              `?${[fromDateQuery, toDateQuery].filter((noop) => noop).join("&")}`,
            );
          }}
          type={"save"}
        />
      </div>
      <DataTable
        columns={[
          { accessor: "accountName", title: "アカウント", width: "50%" },
          {
            accessor: "balance",
            title: "残高",
            width: "50%",
            textAlign: "right",
            render: ({ balance }) => balance?.toLocaleString() ?? 0,
          },
        ]}
        records={balanceRecords}
        onRowClick={(record) => {
          prependParamAndPush({ accountId: record.id });
        }}
        height="50vh"
      />
      <Total total={total} />
    </>
  );
};
