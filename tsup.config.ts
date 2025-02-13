import { rmSync } from "node:fs"
import copyfiles from "copyfiles"
import { type Format, type Options, defineConfig } from "tsup"

// Delete dist folder before building
try {
	rmSync("dist", { recursive: true, force: true })
} catch (_) {
	// Do nothing
}

/**
 * Common configuration for all builds.
 */
const commonConfig: Options = {
	format: "esm" as Format,
	sourcemap: true,
	dts: true,
	shims: true,
	treeshake: true,
	minify: true,

	/**
	 * Note: Clean up is disabled because it causes some DTS files to be deleted during build.
	 */
	clean: false,
}

export default defineConfig([
	// Backend-specific config
	{
		...commonConfig,
		entry: ["src/backend.ts"],
		platform: "node",
		target: "node20",
		banner: {
			js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
		},
	},

	// Frontend-specific config
	{
		...commonConfig,
		entry: ["src/frontend.ts"],
		platform: "browser",
		target: "esnext",
	},

	// Main entry config
	{
		...commonConfig,
		entry: ["src/index.ts"],
		platform: "neutral",
		target: "esnext",
		external: ["*"], // Main entry should not have any dependencies
		async onSuccess() {
			console.info("\nIncluding miscellaneous files to dist:")

			copyfiles(["./package.json", "./dist"], () => null)
			console.info("> Copied package.json to dist")

			copyfiles(["./README.md", "./dist"], () => null)
			console.info("> Copied README.md to dist")

			copyfiles(["./LICENSE", "./dist"], () => null)
			console.info("> Copied LICENSE to dist")

			console.info("> Copied all config files\n")
		},
	},
])
