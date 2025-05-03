import { AxiosFreeeAccountItemsRepository } from "@kageco/persistence/api/axios/freee/axios-freee-account-items-repository";
import { AxiosFreeePartnersRepository } from "@kageco/persistence/api/axios/freee/axios-freee-partners-repository";
import { AxiosFreeeTaxesRepository } from "@kageco/persistence/api/axios/freee/axios-freee-taxes-repository";
import { AxiosFreeeWalletablesRepository } from "@kageco/persistence/api/axios/freee/axios-freee-walletables-repository";

import { findFreeeAuth } from "../../../persistence/browser/server/freee-auth";

export const fetchFreeeMaster = async () => {
  const freeeAuth = await findFreeeAuth();

  const accountItemsRepository = new AxiosFreeeAccountItemsRepository(
    freeeAuth,
  );
  const taxRepository = new AxiosFreeeTaxesRepository(freeeAuth);

  const walletableRepository = new AxiosFreeeWalletablesRepository(freeeAuth);

  const partnerRepository = new AxiosFreeePartnersRepository(freeeAuth);
  console.log(await partnerRepository.getAll());

  return {
    taxes: (await taxRepository.getAll()).taxes.map((tax) => ({
      value: tax.code.toString(),
      label: tax.name_ja,
    })),
    accountItems: grouped(
      (await accountItemsRepository.getAll()).account_items.map((ai) => ({
        value: ai.id.toString(),
        label: ai.name,
        group: ai.group_name,
      })),
    ),
    walletables: (await walletableRepository.getAll()).walletables.map((w) => ({
      value: w.id.toString(),
      label: w.name,
      type: w.type,
    })),
    partners: (await partnerRepository.getAll()).partners
      .filter((partner) => partner.available)
      .map((p) => ({
        value: p.id.toString(),
        label: p.name,
      })),
  };
};

const grouped = (
  input: ({ group: string } & Model)[],
): {
  group: string;
  items: Model[];
}[] => {
  return Object.values(
    input.reduce(
      (acc, { value, label, group }) => {
        if (!acc[group]) {
          acc[group] = { group, items: [] };
        }
        acc[group].items.push({ value, label });
        return acc;
      },
      {} as Record<string, GroupedModel>,
    ),
  );
};

type Model = {
  value: string;
  label: string;
};

type GroupedModel = {
  group: string;
  items: Model[];
};
