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
        "src/stories/**",
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/routeTree.gen.ts",
        "**/__vitest_test__/**",
        "**/*.config.{js,ts}",
        "storybook-static/**",
        "src/lib/**",
        "src/components/ui/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {},
});
