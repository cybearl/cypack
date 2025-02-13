/**
 * Safely converts any error into a string for parsing/searching.
 * @param error The error to convert.
 * @returns The error as a string.
 */
export function convertErrorToString(error: unknown): string {
	if (typeof error === "string") return error

	let stringifiedError = ""
	try {
		stringifiedError = JSON.stringify(error)
	} catch (_) {
		// Ignore
	}

	if (stringifiedError === "" || stringifiedError === "{}") stringifiedError = `${error}`
	return stringifiedError
}
