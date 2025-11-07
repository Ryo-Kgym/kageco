import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { procedure, router } from "../trpc/trpc";

@Injectable()
export class UserRouter {
  userRouter = router({
    hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
      return {
        greeting: `ユーザーからこんにちは ${input.name}さん！`,
      };
    }),

    getUsers: procedure.query(async () => {
      return [
        { id: 1, name: "田中太郎", email: "tanaka@example.com" },
        { id: 2, name: "佐藤花子", email: "sato@example.com" },
      ];
    }),
  });
}
