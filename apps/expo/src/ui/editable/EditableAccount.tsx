import { useGetValidAccountsQuery } from "@v3/graphql/household";
import { useEffect } from "react";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { EditableProps } from "~/ui/editable/editable-props";
import { Picker } from "../Picker";

export const EditableAccount = ({ value, setValue, disabled = false }: EditableProps<string>) => {
  const { groupId } = useSaveGroupId();
  const [{ data }] = useGetValidAccountsQuery({
    variables: {
      groupId,
    },
  });
  const accounts =
    data?.allAccountsList.map((account) => ({
      value: account.accountId,
      label: account.accountName,
    })) ?? [];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!value && accounts[0]) {
      setValue(accounts[0].value);
    }
  }, [accounts]);

  return (
    <Picker
      title={"アカウント"}
      value={value}
      setValue={setValue}
      disabled={disabled}
      data={accounts}
    />
  );
};
