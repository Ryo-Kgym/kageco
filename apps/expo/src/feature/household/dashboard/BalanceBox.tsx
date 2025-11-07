import { useGetAccountBalanceListQuery } from "@v3/graphql/household";
import { Text, View } from "react-native";

import { paths } from "~/app/paths";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { DashboardFrame } from "./DashboardFrame";

export const BalanceBox = () => {
  const today = new Date();
  const { groupId } = useSaveGroupId();

  const [{ data }] = useGetAccountBalanceListQuery({
    variables: {
      groupId,
      fromDate: "2019-01-01",
      toDate: today.toISOString().slice(0, 10),
    },
  });

  const totalBalance =
    data?.account.reduce((acc, account) => {
      const balance =
        (account.allDetailViewsAggregate?.aggregate?.sum?.signedAmount as number) ?? 0;
      return acc + balance;
    }, 0) ?? 0;

  return (
    <DashboardFrame label={"残高"} href={paths.household.account} size={"50%"}>
      <View>
        <Text className={"text-right text-lg"}>{totalBalance.toLocaleString()}</Text>
        <Text>{today.toLocaleString().slice(0, 10)} 時点</Text>
      </View>
    </DashboardFrame>
  );
};
