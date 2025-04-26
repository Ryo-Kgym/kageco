import type { ComponentProps, FC } from "react";

import { SearchFormClient } from "./SearchFormClient";

type Props = ComponentProps<typeof SearchFormClient>;
export const SearchFormServer: FC<Props> = (props) => {
  return (
    <>
      <SearchFormClient {...props} />
    </>
  );
};
