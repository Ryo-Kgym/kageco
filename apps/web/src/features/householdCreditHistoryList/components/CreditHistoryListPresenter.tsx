import { Table, type TableProps } from "../../../components/atoms/Table";

type CreditCardTablePresenterProps = {
  tableProps: TableProps[];
};
export const CreditHistoryListPresenter = ({ tableProps }: CreditCardTablePresenterProps) => (
  <div className={"col-span-1 grid"}>
    <Table
      header={["引落日", "種類", "アカウント", "合計"]}
      tablePropsList={tableProps}
      size={"xs"}
      toBottom
      height={"85vh"}
      defaultBottom={false}
    />
  </div>
);
