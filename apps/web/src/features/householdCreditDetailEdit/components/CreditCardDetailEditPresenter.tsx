import type { ReactNode } from "react";

import { MemoTextArea } from "../../../components/molecules/CustomTextArea/Memo";
import { Button } from "../../../components/ui/button/v5";
import { DatePicker } from "../../../components/ui/date";
import { AmountInput } from "../../../components/ui/numberInput/amount/AmountInput";
import { IocomeTypeSegment } from "../../../components/ui/segment/IocomeTypeSegment";
import { CategorySelect } from "../../../components/ui/select/CategorySelect";
import { GenreSelect } from "../../../components/ui/select/GenreSelect";
import { TagInputWrapper } from "../../../components/ui/tag/TagInputWrapper";
import type { IocomeType } from "../../../domain/model/household/IocomeType";
import type { CreditDetailEditDisplayState, CreditDetailEditFormState } from "../types/type";

export const CreditCardDetailEditPresenter = ({
  formData,
  display,
  setIocomeType,
  setCategoryId,
  setGenreId,
  setMemo,
  setTags,
  onClickUpdate,
  onClickReset,
}: {
  formData: CreditDetailEditFormState;
  display: CreditDetailEditDisplayState;
  setIocomeType: (_: IocomeType) => void;
  setCategoryId: (_: string | null) => void;
  setGenreId: (_: string | null) => void;
  setMemo: (_: string) => void;
  setTags: (_: string[]) => void;
  onClickUpdate: () => void;
  onClickReset: () => void;
}) => (
  <div className={"grid w-full grid-cols-1"}>
    <Frame>
      <DatePicker
        value={display.date}
        onChange={() => undefined}
        defaultValue={display.date}
        disabled
      />
    </Frame>
    <Frame>
      <IocomeTypeSegment iocomeType={display.iocomeType} onChange={setIocomeType} disabled />
    </Frame>
    <Frame>
      <GenreSelect
        iocomeType={display.iocomeType}
        genreId={formData.genreId}
        onChange={setGenreId}
        withLabel
      />
    </Frame>
    <Frame>
      <CategorySelect
        genreId={formData.genreId}
        categoryId={formData.categoryId}
        onChange={setCategoryId}
        withLabel
      />
    </Frame>
    <Frame>
      <AmountInput value={display.amount} onChange={() => undefined} disabled />
    </Frame>
    <Frame>
      <MemoTextArea memo={formData.memo} setMemo={setMemo} />
    </Frame>
    <Frame>
      <TagInputWrapper values={formData.tags} onChange={setTags} />
    </Frame>
    <div className={"flex space-x-5"}>
      <Button onClick={onClickUpdate} label={"更新"} type={"modify"} />
      <Button onClick={onClickReset} label={"リセット"} type={"reset"} />
    </div>
    <Frame>
      <div>ID: {display.id}</div>
    </Frame>
  </div>
);

const Frame = ({ children }: { children: ReactNode }) => <div className={"py-2"}>{children}</div>;
