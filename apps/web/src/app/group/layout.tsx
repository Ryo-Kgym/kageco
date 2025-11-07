/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

import { SelectPageLayout } from "../_layout/SelectPageLayout";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SelectPageLayout title={"グループを選択してください"}>{children}</SelectPageLayout>
);

export default Layout;
