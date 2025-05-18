import { YYYYmmDD } from "@/util/date/date";

import { convertToYmd } from "@/util/date/convertToYmd";
import { MemoTextArea } from "../../../components/molecules/CustomTextArea/Memo";
import { Button } from "../../../components/ui/button/v5";
import { DatePicker } from "../../../components/ui/date";
import { AmountInput } from "../../../components/ui/numberInput/amount/AmountInput";
import { AccountSelect } from "../../../components/ui/select/AccountSelect";
import { CategorySelect } from "../../../components/ui/select/CategorySelect";
import { GenreSelect } from "../../../components/ui/select/GenreSelect";
import { Loading } from "../../../components/ui/v5/loading";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { useNavigation } from "../../../routing/client/useNavigation";
import { useStateCutDailyDetail } from "../hooks/useStateCutDailyDetail";
import { cutDailyDetail } from "../useServer/cutDailyDetail";

export const CutDailyDetail = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const { loading, form, setForm, initData, cutAfter, setCutAfterInit } =
    useStateCutDailyDetail({
      id,
    });

  const updateButtonDisabled = form?.amount === 0 || cutAfter.amount < 0;
  const { refresh } = useNavigation();

  const updateHandler = async () => {
    if (loading) return;

    try {
      await cutDailyDetail({
        initData,
        cutAfter,
        form,
      });
      successPopup("更新しました。");
      refresh();
      onClose();
    } catch (e) {
      console.error(e);
      errorPopup("更新に失敗しました。");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className={"flex items-center justify-items-center"}>
        <div className={"w-full"}>
          <div>分解前</div>
          <DatePicker
            value={new YYYYmmDD(initData.date).parseDate()}
            onChange={() => undefined}
            required
            disabled
          />
          <GenreSelect
            genreId={initData.genreId}
            onChange={() => undefined}
            iocomeType={initData.iocomeType}
            disabled
          />
          <CategorySelect
            genreId={initData.genreId}
            categoryId={initData.categoryId}
            onChange={() => undefined}
            disabled
          />
          <AccountSelect
            accountId={initData.accountId}
            onChange={() => undefined}
            disabled
          />
          <AmountInput
            value={initData.amount}
            onChange={() => undefined}
            disabled
          />
          <MemoTextArea
            memo={initData.memo}
            setMemo={() => undefined}
            disabled
          />
        </div>
        <div className={"w-32 items-center justify-items-center text-center"}>
          <div>{"->"}</div>
        </div>
        <div className={"w-full"}>
          <div>分解後</div>
          <DatePicker
            value={new YYYYmmDD(initData.date).parseDate()}
            onChange={() => undefined}
            required
            disabled
          />
          <GenreSelect
            genreId={initData.genreId}
            onChange={() => undefined}
            iocomeType={initData.iocomeType}
            disabled
          />
          <CategorySelect
            genreId={initData.genreId}
            categoryId={initData.categoryId}
            onChange={() => undefined}
            disabled
          />
          <AccountSelect
            accountId={initData.accountId}
            onChange={() => undefined}
            disabled
          />
          <AmountInput
            value={cutAfter.amount}
            onChange={() => undefined}
            disabled
          />
          <MemoTextArea
            memo={cutAfter.memo}
            setMemo={(v) => setCutAfterInit({ ...cutAfter, memo: v })}
          />
        </div>
        <div className={"w-32 items-center justify-items-center text-center"}>
          <div>{"+"}</div>
        </div>
        <div className={"w-full"}>
          <div>新規</div>
          <DatePicker
            value={new YYYYmmDD(form.date).parseDate()}
            onChange={(v) =>
              setForm({
                ...form,
                date: new YYYYmmDD(convertToYmd(v)).toString(),
              })
            }
            required
            defaultValue={new YYYYmmDD(form.date).parseDate()}
          />
          <GenreSelect
            genreId={form.genreId}
            onChange={(v) => setForm({ ...form, genreId: v })}
            iocomeType={form.iocomeType}
          />
          <CategorySelect
            genreId={form.genreId}
            categoryId={form.categoryId}
            onChange={(v) => setForm({ ...form, categoryId: v })}
          />
          <AccountSelect
            accountId={initData.accountId}
            onChange={() => undefined}
            disabled
          />
          <AmountInput
            value={form.amount}
            onChange={(v) => setForm({ ...form, amount: v })}
          />
          <MemoTextArea
            memo={form.memo}
            setMemo={(v) => setForm({ ...form, memo: v })}
          />
        </div>
      </div>
      <div className={"grid grid-cols-2 justify-items-center"}>
        <Button
          type={"modify"}
          label={"更新"}
          onClick={updateHandler}
          disabled={updateButtonDisabled}
        />
      </div>
    </div>
  );
};
