import { CreditHistoryListServer } from "../../../../features/household/credit-history/list/credit-history-list.server";
import { findUser } from "../../../../persistence/browser/server/find-user";

const Page = async () => {
  const { group } = await findUser();

  return <CreditHistoryListServer groupId={group.id} />;
};

export default Page;
