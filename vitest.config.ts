import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: __dirname,
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
