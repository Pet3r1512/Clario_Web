import { defineConfig, coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text"],
      exclude: [
        "storybook-static/*",
        "src/**/*.stories.tsx",
        "src/**/*.{config,test}.{ts, js}",
        "src/**/*.ts",
        "src/components/ui/*",
        "src/routeTree.gen.ts",
        "__vitest_test__/**/*",
        "*.config.js",
        "*.config.ts",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {},
});
