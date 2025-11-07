import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;

@Injectable()
export class TrpcRouter {
  appRouter = router({
    hello: procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
        return {
          greeting: `こんにちは ${input.name}さん！`,
        };
      }),

    createUser: procedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
        }),
      )
      .mutation(async ({ input }) => {
        // ここでデータベース操作を行う
        return {
          id: Date.now(),
          name: input.name,
          email: input.email,
          createdAt: new Date(),
        };
      }),

    getUsers: procedure.query(async () => {
      // ユーザー一覧を取得
      return [
        { id: 1, name: "田中太郎", email: "tanaka@example.com" },
        { id: 2, name: "佐藤花子", email: "sato@example.com" },
      ];
    }),

    getUserById: procedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        // IDによるユーザー取得
        return {
          id: input.id,
          name: "田中太郎",
          email: "tanaka@example.com",
        };
      }),
  });
}

export type AppRouter = TrpcRouter["appRouter"];
