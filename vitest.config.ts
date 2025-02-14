import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		include: ["./tests/unit/**/*.test.ts"],
	},
	plugins: [tsconfigPaths()],
})
