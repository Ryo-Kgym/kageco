import { FieldContainer } from "../FieldContainer";
import type { FieldValueProps } from "../property";

export const MultiTextInput = ({ label, value, setValue }: FieldValueProps<string>) => {
  return (
    <FieldContainer label={label}>
      <textarea
        className={"w-full cursor-pointer p-2 focus:outline-none"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FieldContainer>
  );
};
