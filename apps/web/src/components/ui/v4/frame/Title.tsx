import type { ReactNode } from "react";

export const Title = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className={"flex w-full items-end space-x-5 border-b-2 border-gray-300 py-3 pl-3"}>
      <div className={"text-4xl"}>{title}</div>
      {children}
    </div>
  );
};
