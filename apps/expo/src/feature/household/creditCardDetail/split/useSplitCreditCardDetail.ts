import {
  useCreateCreditCardDetailMutation,
  useUpdateCreditCardDetailAmountByIdMutation,
} from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { CreditCardDetail } from "~/hooks/household/credit_card/credit-card-type";
import { useGenerateId } from "~/hooks/id/useGenerateId";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";

export const useSplitCreditCardDetail = () => {
  const [originalUpdateResult, originalUpdateMutation] =
    useUpdateCreditCardDetailAmountByIdMutation();
  const [splitInsertResult, splitInsertMutation] = useCreateCreditCardDetailMutation();
  const { generateId } = useGenerateId();
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();

  const split = async ({
    original,
    split,
  }: {
    original: CreditCardDetail;
    split: {
      genreId: string;
      categoryId: string;
      amount: number;
      memo: string;
    };
  }) => {
    try {
      await originalUpdateMutation({
        id: original.id,
        amount: original.amount - split.amount,
      });
      if (originalUpdateResult.error) {
        throw originalUpdateResult.error;
      }

      await splitInsertMutation({
        id: generateId(),
        date: original.date,
        iocomeType: original.genre.iocomeType,
        genreId: split.genreId,
        categoryId: split.categoryId,
        amount: split.amount,
        memo: split.memo,
        summaryId: original.summaryId,
        userId,
        groupId,
      });
      if (splitInsertResult.error) {
        throw splitInsertResult.error;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return { split };
};
