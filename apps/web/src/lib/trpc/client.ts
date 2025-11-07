import type { AppRouter } from "@kageco/trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: undefined,
  links: [
    httpBatchLink({
      url: process.env.V5_API_BASE_URL || "",
      headers: async () => {
        const token = "await getToken()";
        return {
          "x-token": token,
        };
      },
    }),
  ],
});
