import { useGetAccountBalanceListQuery } from "@v3/graphql/household";
import { useRouter } from "expo-router";

import { paths } from "~/app/paths";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { BalanceListPresenter } from "./BalanceListPresenter";

export const BalanceListContainer = () => {
  const { groupId } = useSaveGroupId();
  const { push } = useRouter();

  const [{ data }] = useGetAccountBalanceListQuery({
    variables: {
      groupId,
      fromDate: "2019-01-01",
      toDate: new Date().toISOString().slice(0, 10),
    },
  });
  const accounts =
    data?.account.map((account) => ({
      id: account.id,
      name: account.accountName,
      balance:
        (account.allDetailViewsAggregate?.aggregate?.sum
          ?.signedAmount as number) ?? 0,
      redirectHandler: () =>
        push(paths.household.detailListByAccount({ accountId: account.id })),
    })) ?? [];
  return <BalanceListPresenter accounts={accounts} />;
};
