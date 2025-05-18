import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
    alias: {
      "@/util": path.resolve(__dirname, "../../packages/util"),
    },
  },
});
