import type { ComponentProps, FC } from "react";

import { SearchFormClient } from "./search-form-client";

type Props = ComponentProps<typeof SearchFormClient>;
export const SearchFormServer: FC<Props> = (props) => {
  return (
    <>
      <SearchFormClient {...props} />
    </>
  );
};
