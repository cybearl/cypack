/**
 * Allows to add query parameters to a URL.
 * @param baseUrl The base URL to add parameters to.
 * @param params The parameters to add.
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

		url += `${url.includes("?") ? "&" : "?"}${key}=${value.toString()}`
	}

	return url
}
