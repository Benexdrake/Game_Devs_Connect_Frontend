import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['dotenv/config'],
    pool: 'forks',
    poolOptions: {
      forks: {
        singleThread: true,
      },
    },
  },
});