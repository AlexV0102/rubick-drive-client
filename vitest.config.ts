// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/__mocks__/localStorageMock.ts"],
    environment: "jsdom",
  },
});
