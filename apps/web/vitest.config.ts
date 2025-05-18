/// <reference types="vitest" />
import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
    alias: {
      "@/core": path.resolve(__dirname, "../../packages/core"),
      "@/util": path.resolve(__dirname, "../../packages/util"),
    },
  },
});
