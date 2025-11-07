import type { ReactNode } from "react";

const Layout = ({
  chart,
  detailTable,
}: {
  chart: ReactNode;
  detailTable: ReactNode;
}) => {
  return (
    <div className="space-y-10">
      <div className="h-[44vh] rounded-lg bg-white p-3">{chart}</div>
      <div className="h-[45vh] rounded-lg bg-white p-3 shadow-md">{detailTable}</div>
    </div>
  );
};

export default Layout;
