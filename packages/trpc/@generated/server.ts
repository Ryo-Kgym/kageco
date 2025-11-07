import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  user: t.router({ getUser: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any) }),
  group: t.router({ getGroupsMembers: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any) })
});
export type AppRouter = typeof appRouter;

