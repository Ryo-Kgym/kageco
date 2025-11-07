import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { GroupRouter } from "../group/group.router";
import { UserRouter } from "../user/user.router";
import { procedure, router } from "./trpc";

@Injectable()
export class TrpcRouter {
  public readonly appRouter;

  constructor(
    private readonly userRouter: UserRouter,
    private readonly groupRouter: GroupRouter,
  ) {
    this.appRouter = router({
      // ドメイン別ルーターは「インスタンス.プロパティ名」で統合
      user: this.userRouter.userRouter,
      group: this.groupRouter.groupRouter,
      // 共通エンドポイント
      hello: procedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
          return {
            greeting: `メインからこんにちは ${input.name}さん！`,
          };
        }),
    });
  }
}

export type AppRouter = TrpcRouter["appRouter"];
