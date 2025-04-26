import type { ReactNode } from "react";
import { FreeeLayout } from "../../../../features/freee/components/freee-layout";

/**
 * freee関連ページのレイアウト
 */
export default function FreeeLayoutPage({ children }: { children: ReactNode }) {
  return <FreeeLayout>{children}</FreeeLayout>;
}
