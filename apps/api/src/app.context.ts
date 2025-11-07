import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express"; // Request, Responseの型を明示的にインポート
import type { ContextOptions, TRPCContext } from "nestjs-trpc";

export interface AppContextShape {
  req: Request;
  res: Response;
  token: string | undefined;
}

@Injectable()
export class AppContext implements TRPCContext {
  async create(opts: ContextOptions) {
    const { req, res } = opts;

    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);

    const token = req.headers["x-token"] as string | undefined;

    return {
      req,
      res,
      token,
    } satisfies AppContextShape;
  }
}
