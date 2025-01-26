// Mock require function in browser environment
if (typeof window !== "undefined") {
	window.require = ((name: string) => {
		throw new Error(`Cannot import ${name} in browser environment.`)
		// biome-ignore lint/suspicious/noExplicitAny: This is a mock function
	}) as any
}
