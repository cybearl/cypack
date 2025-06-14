/**
 * Allows to add query parameters to a URL.
 * @param baseUrl The base URL to add parameters to.
 * @param params The parameters to add, note that each parameter will be URL-encoded.
 * @returns The URL with the parameters added.
 */
export function addParamsToUrl(
	baseUrl: string,
	params: {
		[key: string]: string | number | boolean | undefined | null
	},
) {
	let url = baseUrl

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === "" || value === "null" || value === "undefined") {
			continue
		}

		url += `${url.includes("?") ? "&" : "?"}${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
	}

	return url
}

/**
 * Get the current URL origin or null if it's not available.
 */
export const currentUrlOrigin = typeof window !== "undefined" && window.location.origin ? window.location.origin : null
