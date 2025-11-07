import { GenreType } from "../../../domain/model/household/GenreType";
import { Segment } from "./Segment";

type Props = {
  genreType: GenreType;
  onChange: (_: GenreType) => void;
  disabled?: boolean;
};
export const GenreTypeSegment = ({ genreType, onChange, disabled = false }: Props) => {
  return <Segment value={genreType} onChange={onChange} data={data} disabled={disabled} />;
};

const data = [
  { value: GenreType.FIXED, label: "固定" },
  { value: GenreType.FLUCTUATION, label: "変動" },
];
