import { INestApplication, Injectable } from "@nestjs/common";
import * as trpcExpress from "@trpc/server/adapters/express";
import { TrpcRouter } from "./trpc.router";

@Injectable()
export class TrpcService {
  constructor(private readonly trpcRouter: TrpcRouter) {}

  applyMiddleware(app: INestApplication) {
    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: this.trpcRouter.appRouter,
        createContext: ({ req, res }) => ({ req, res }),
      }),
    );
  }
}
