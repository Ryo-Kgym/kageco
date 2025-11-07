"use client";

import { convertToYmd } from "@/util/date/convertToYmd";
import type { AccountBalance } from "features/householdAccountList/types/accountBalance";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./balance-list-table.module.scss";

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
  const searchParams = useSearchParams();

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
          value={form.fromDate}
          setValue={(d) => {
            setForm((prev) => ({
              ...prev,
              fromDate: d,
            }));
          }}
        />
        <DateInput
          label={"To"}
          value={form.toDate}
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
            await saveAccountIds(form.accountIds);

            const newSearchParams = new URLSearchParams(searchParams);
            form.fromDate && newSearchParams.set("fromDate", convertToYmd(form.fromDate));
            form.toDate && newSearchParams.set("toDate", convertToYmd(form.toDate));

            push(`?${newSearchParams}`);
          }}
          type={"save"}
        />
      </div>
      <DataTable
        columns={[
          { accessor: "id", title: "ID", hidden: true },
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
        rowClassName={({ id }) => {
          const baseClass = "cursor-pointer hover:bg-gray-100";
          // 同じaccountIdを持つレコードに特別なクラスを適用
          return searchParams.get("accountId") === id
            ? `${baseClass} ${styles["same-account-id"]}`
            : baseClass;
        }}
      />
      <Total total={total} />
    </>
  );
};
