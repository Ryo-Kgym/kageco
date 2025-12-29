import { Table } from "components/ui/v4/table";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { MemoTextArea } from "../../../../../components/molecules/CustomTextArea/Memo";
import { CategorySelect } from "../../../../../components/ui/select/CategorySelect";
import { GenreSelect } from "../../../../../components/ui/select/GenreSelect";
import { IocomeType } from "../../../../../domain/model/household/IocomeType";
import { useFileImportColumnMapping } from "../../client/useFileImportColumnMapping";
import { useImportFileRowAware } from "../../client/useImportFileRowAware";
import type { ImportFileType } from "../../types/importFileType";

type Props = {
  importFileType: ImportFileType;
  item: string[];
  rowNumber: number;
  default: {
    genreId: string | null;
    categoryId: string | null;
  };
};

export const LoadFileInputRow: FC<Props> = ({
  importFileType,
  item,
  rowNumber,
  default: defaultProps,
}) => {
  const [genreId, setGenreId] = useState<string | null>(defaultProps.genreId);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [memo, setMemo] = useState<string>("");
  const [iocomeType, setIocomeType] = useState<IocomeType>(IocomeType.Outcome);
  const { mapping } = useFileImportColumnMapping();
  const { setImportFileRowAware } = useImportFileRowAware();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCategoryId(defaultProps.categoryId);
  }, [genreId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(
    () => {
      // FIXME それぞれの責務で分割すること
      switch (importFileType) {
        case "creditCsv": {
          if (!mapping.settlementDate) return;
          if (!mapping.amount) return;

          setImportFileRowAware(rowNumber, {
            date: new Date(item[mapping.settlementDate - 1] ?? ""),
            amount: Number(item[mapping.amount - 1]),
            memo: memo,
            genreId: genreId ?? "",
            categoryId: categoryId ?? "",
            iocomeType,
          });
          break;
        }
        case "bankCsv": {
          if (!mapping.date) return;
          if (!mapping.income) return;
          if (!mapping.outcome) return;

          setImportFileRowAware(rowNumber, {
            date: new Date(item[mapping.date - 1] ?? ""),
            amount: Number(
              item[
                iocomeType === IocomeType.Income
                  ? mapping.income - 1
                  : mapping.outcome - 1
              ],
            ),
            memo: memo,
            genreId: genreId ?? "",
            categoryId: categoryId ?? "",
            iocomeType,
          });
          break;
        }
        default: {
          ((_: never) => {
            // noop
          })(importFileType);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId, memo],
  );

  useEffect(() => {
    if (!mapping.income || !mapping.outcome) {
      return;
    }

    if (item[mapping.income - 1] !== "" && item[mapping.outcome - 1] === "") {
      setIocomeType(IocomeType.Income);
    }
    if (item[mapping.income - 1] === "" && item[mapping.outcome - 1] !== "") {
      setIocomeType(IocomeType.Outcome);
    }
  }, [item, mapping]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(
    () => {
      if (!mapping.memo) return;

      setMemo(item[mapping.memo - 1] ?? "");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapping.memo],
  );

  const hasNull = Object.values(mapping).some((v) => v === null);

  return (
    <>
      {item
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        .map((c, i) => <Table.BodyTd key={i}>{c}</Table.BodyTd>)
        .concat(
          <Table.BodyTd key={`genre-${rowNumber}`}>
            <GenreSelect
              genreId={genreId}
              onChange={setGenreId}
              iocomeType={iocomeType}
              disabled={hasNull}
            />
          </Table.BodyTd>,
        )
        .concat(
          <Table.BodyTd key={`category-${rowNumber}`}>
            <CategorySelect
              categoryId={categoryId}
              onChange={setCategoryId}
              genreId={genreId}
              disabled={hasNull}
            />
          </Table.BodyTd>,
        )
        .concat(
          <Table.BodyTd key={`memo-${rowNumber}`}>
            <MemoTextArea
              memo={memo}
              setMemo={setMemo}
              noLabel
              disabled={hasNull}
            />
          </Table.BodyTd>,
        )}
    </>
  );
};
