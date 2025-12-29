import { CreditDetailListServer } from "../../../../../features/household/credit-detail/list/credit-detail-list.server";

const Page = async ({ params }: { params: Promise<{ summaryId: string }> }) => {
  const { summaryId } = await params;
  return <CreditDetailListServer creditCardSummaryId={summaryId} />;
};

export default Page;
