import { GetDetailMasterDocument } from "@v3/graphql/household/schema/master/queryDetailMaster.generated";
import { IocomeType } from "domain/model/household/IocomeType";

import type { SelectProps } from "../../../components/ui/select/v4";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import { RegisterDailyButtonClient } from "./RegisterDailyButtonClient";

export const RegisterDailyButtonServer = async () => {
  const { group } = await findUser();

  const { data } = await execQuery(GetDetailMasterDocument, {
    groupId: group.id,
  });

  if (!data.group) {
    throw new Error("Group not found");
  }

  const accountData = data.group.accounts.map((account) => ({
    value: account.id,
    label: account.name,
  })) satisfies SelectProps<string>["data"];

  const incomeGenreData = data.group.incomeGenres.map((genre) => ({
    value: genre.id,
    label: genre.name,
    description: genre.categories.map((c) => c.name).join(", "),
  })) satisfies SelectProps<string>["data"];

  const outcomeGenreData = data.group.outcomeGenres.map((genre) => ({
    value: genre.id,
    label: genre.name,
    description: genre.categories.map((c) => c.name).join(", "),
  })) satisfies SelectProps<string>["data"];

  const genreData = {
    [IocomeType.Income]: incomeGenreData,
    [IocomeType.Outcome]: outcomeGenreData,
  };

  const categoryData = Object.fromEntries(
    [...data.group.incomeGenres, ...data.group.outcomeGenres].map((genre) => [
      genre.id,
      genre.categories.map((c) => ({
        value: c.id,
        label: c.name,
      })),
    ]),
  );

  const tagData = data.group.tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    colorCode: tag.colorCode,
  }));

  const templateData = Object.fromEntries(
    data.group.templates.map((template) => [
      template.id,
      {
        id: template.id,
        name: template.name,
        iocomeType: template.iocomeType,
        genreId: template.genreId,
        categoryId: template.categoryId,
        amount: template.amount,
        memo: template.memo,
      },
    ]),
  );

  return (
    <RegisterDailyButtonClient
      accountData={accountData}
      genreData={genreData}
      categoryData={categoryData}
      tagData={tagData}
      templateData={templateData}
    />
  );
};
