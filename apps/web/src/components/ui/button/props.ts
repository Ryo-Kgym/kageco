export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type: "add" | "back" | "create" | "dangerous" | "display" | "modify" | "reset" | "save";
};
