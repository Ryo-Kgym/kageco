import { convertToYmd } from "@/util/date/convertToYmd";
import { BusinessTimeCardServer } from "../../../../features/businessTimeCard/components/BusinessTimeCardServer";

const Page = async () => {
  return <BusinessTimeCardServer baseDate={convertToYmd(new Date())} />;
};

export default Page;

export const dynamic = "force-dynamic";
