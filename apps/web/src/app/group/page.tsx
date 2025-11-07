import { SelectGroupServer } from "../../features/groupSelect/components/SelectGroupServer";
import { trpc } from "../../lib/trpc/client";

const SelectGroupPage = async () => {
  await trpc.group;

  return <SelectGroupServer />;
};
export default SelectGroupPage;
