const genreTypeMap = {
  FIXED: "固定",
  FLUCTUATION: "変動",
} as const;

export type GenreType = keyof typeof genreTypeMap;

export const genreTypeArray = Object.keys(genreTypeMap).map((key) => key as GenreType);

export const getGenreTypeLabel = (genreType: GenreType) => genreTypeMap[genreType];
