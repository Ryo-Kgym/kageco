import { useEffect, useState } from "react";
import { fetchFreeeMasterActions } from "../actions/fetch-freee-master-actions";

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

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        setLoadingMasters(true);
        const masters = await fetchFreeeMasterActions();
        setFreeeMasters(masters);
      } finally {
        setLoadingMasters(false);
      }
    };

    void fetchMasters();
  }, []);

  return { freeeMasters, loadingMasters };
};
