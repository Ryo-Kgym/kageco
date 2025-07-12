import { BackModal } from "../../../../../../../../components/ui";
import { CreditCardDetailEditContainer } from "../../../../../../../../features/householdCreditDetailEdit/components/credit-card-detail-edit-container";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <BackModal>
      <CreditCardDetailEditContainer id={id} />
    </BackModal>
  );
};

export default Page;
