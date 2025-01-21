/**
 * Note that TailwindCSS is NOT used directly inside of this project, no CSS file will be generated inside
 * of the bundle. This file ONLY serves as an entry point for the consumer's TailwindCSS configuration.
 */
/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./**/*.{ts,tsx}"],
	theme: {},
	plugins: [],
}
