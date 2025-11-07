import type { ReactNode } from "react";

export const TailWindCSSTable = ({ children }: { children: ReactNode }) => (
  <table width={"100%"}>{children}</table>
);

const Header = ({ headerItems }: { headerItems: { name: string }[] }) => (
  <thead>
    <tr className={"bg-gray-100"}>
      {headerItems.map(({ name }, index) => (
        <th
          key={`th-td-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }}`}
          className={"border border-gray-300 p-2 font-bold"}
        >
          {name}
        </th>
      ))}
    </tr>
  </thead>
);

const Body = <T,>({
  data,
  renderItem,
  children,
  rowClick,
}: {
  data: T[];
  renderItem: (t: T, index: number) => ReactNode;
  children?: ReactNode;
  rowClick?: (item: T) => void;
}) => (
  <tbody>
    {data.map((item, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <Tr key={index} rowClick={rowClick && (() => rowClick(item))}>
        {renderItem(item, index)}
      </Tr>
    ))}
    {children}
    {data.length === 0 && (
      <tr>
        <td colSpan={100} className={"border border-gray-300 p-2 text-center"}>
          No data
        </td>
      </tr>
    )}
  </tbody>
);

const Tr = ({
  children,
  rowClick,
}: {
  children: ReactNode;
  rowClick?: () => void;
}) => (
  <tr
    className={`border border-gray-300 even:bg-gray-50 hover:bg-gray-100 ${rowClick ? "cursor-pointer" : ""}`}
    onClick={rowClick}
    onKeyPress={undefined}
  >
    {children}
  </tr>
);

const Td = ({
  children,
  align = "left",
  bgColor = "bg-inherit",
}: {
  children: ReactNode;
  align?: "left" | "center" | "right";
  bgColor?: `bg-${string}`;
}) => (
  <td className={`border border-gray-300 p-2 ${bgColor}`} style={{ textAlign: align }}>
    {children}
  </td>
);

TailWindCSSTable.Header = Header;
TailWindCSSTable.Body = Body;
TailWindCSSTable.BodyTr = Tr;
TailWindCSSTable.BodyTd = Td;
