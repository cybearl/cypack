/**
 * Returns true if the code is running in a server environment.
 */
export function isServer() {
	return typeof window === "undefined"
}

/**
 * Returns true if the code is running in a client environment.
 */
export function isClient() {
	return !isServer()
}
