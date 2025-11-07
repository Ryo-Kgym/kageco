import { TextInput } from "../../atoms/TextInput";

type GenreNameTextInputProps = {
  genreName: string;
  setGenreName: (_: string) => void;
};

export const GenreNameTextInput = ({ genreName, setGenreName }: GenreNameTextInputProps) => (
  <TextInput
    label={""}
    value={genreName}
    onChange={setGenreName}
    withAsterisk={true}
    maxLength={256}
  />
);
