import { useEffect, useState } from "react";
import { fetchFreeeMastersAction } from "../actions/fetch-freee-masters-action";

export type FreeeSelectItem = {
  value: string;
  label: string;
};

export type FreeeAccountItem = {
  group: string;
  items: FreeeSelectItem[];
};

export type FreeeWalletableItem = FreeeSelectItem & {
  type: string;
};

export type FreeeMasters = {
  taxes: FreeeSelectItem[];
  accountItems: FreeeAccountItem[];
  walletables: FreeeWalletableItem[];
  partners: FreeeSelectItem[];
};

export const useStateFreeeMaster = () => {
  const [freeeMasters, setFreeeMasters] = useState<FreeeMasters | null>(null);
  const [loadingMasters, setLoadingMasters] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // freeeマスターデータの取得
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        setLoadingMasters(true);
        const masters = await fetchFreeeMastersAction();
        setFreeeMasters(masters);
        setError(null);
      } catch (err) {
        console.error("Error fetching freee masters:", err);
        setError(
          "freeeマスターデータの取得に失敗しました。もう一度お試しください。",
        );
      } finally {
        setLoadingMasters(false);
      }
    };

    void fetchMasters();
  }, []);

  return { freeeMasters, loadingMasters, error };
};
