import { BaseErrors, stringifyError } from "@/backend"

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

/**
 * Check if the code is running in a server environment.
 * @throws An error if the code is **not** running in a server environment.
 */
export function assertServer() {
	if (!isServer()) throw new Error(stringifyError(BaseErrors.BACKEND_FUNCTION_RUNNING_ON_CLIENT))
}
