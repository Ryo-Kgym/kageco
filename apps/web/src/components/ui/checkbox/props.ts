export type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (_: boolean) => void;
  /**
   * ラベルを折り返さないかどうか
   */
  nowrap?: boolean;
};
