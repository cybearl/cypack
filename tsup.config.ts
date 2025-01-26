import copyfiles from "copyfiles"
import { defineConfig } from "tsup"

export default defineConfig(options => ({
	entry: ["src/backend.ts", "src/frontend.ts", "src/index.ts"],
	format: ["esm"],
	// minify: !options.watch,
	minify: false,
	splitting: false,
	treeshake: true,
	sourcemap: true,
	clean: true,
	dts: true,
	onSuccess: async () => {
		console.info("\nIncluding miscellaneous files to dist:")

		copyfiles(["./package.json", "./dist"], () => null)
		console.info("> Copied package.json to dist")

		copyfiles(["./README.md", "./dist"], () => null)
		console.info("> Copied README.md to dist")

		copyfiles(["./LICENSE", "./dist"], () => null)
		console.info("> Copied LICENSE to dist")

		copyfiles(["./postcss.config.js", "./dist"], () => null)
		console.info("> Copied postcss.config.js to dist")

		copyfiles(["./tailwind.config.js", "./dist"], () => null)
		console.info("> Copied tailwind.config.js to dist")

		console.info("")
	},
}))
