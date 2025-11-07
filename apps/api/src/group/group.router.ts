import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { procedure, router } from "../trpc/trpc";

@Injectable()
export class GroupRouter {
  groupRouter = router({
    hello: procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
        return {
          greeting: `グループからこんにちは ${input.name}さん！`,
        };
      }),

    getGroups: procedure.query(async () => {
      return [
        { id: 1, name: "開発チーム" },
        { id: 2, name: "営業チーム" },
      ];
    }),
  });
}
