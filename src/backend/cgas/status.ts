import type { RequestResult } from "@/main/types/requests"

/**
 * The type for the CGAS status string, it can either be:
 * - `enabled`: The application is enabled and available to the public.
 * - `disabled`: The application is disabled and not available to the public.
 * - `in-maintenance`: The application is in maintenance mode and not available to the public.
 * - `in-development`: The application is in development mode and not available to the public.
 */
export type CGASStatusString = "enabled" | "disabled" | "in-maintenance" | "in-development"

/**
 * The Cybearl General API System (CGAS) status response.
 *
 * About the status of the application (allows to enable/disable the application),
 * it can either be:
 * - `enabled`: The application is enabled and available to the public.
 * - `disabled`: The application is disabled and not available to the public.
 * - `in-maintenance`: The application is in maintenance mode and not available to the public.
 * - `in-development`: The application is in development mode and not available to the public.
 */
export type CGASStatus = {
	status: CGASStatusString
	marker: string
	timestamp: string
	version: {
		raw: string
		formatted: `v${string}` | "unavailable"
	}
	message: string
}

/**
 * Returns the formatted status of the application based on the different parameters.
 * This function should be executed within the CGAS API endpoint to return the status.
 * @param status The status of the application.
 * @param marker The marker of the application.
 * @param version The version of the application (optional).
 * @param message The message to display (optional).
 * @param markerOnly Whether to only return the marker (optional, defaults to false).
 * @returns The formatted status of the application.
 */
export function generateCGASStatus(
	status: CGASStatusString,
	marker: string,
	version: string | undefined,
	message?: string,
	markerOnly?: boolean,
): CGASStatus | string {
	if (markerOnly) return marker

	return {
		status,
		marker,
		timestamp: new Date().toISOString(),
		version: {
			raw: version ?? "unavailable",
			formatted: version ? `v${version}` : "unavailable",
		},
		message: message ?? "The application is running smoothly.",
	}
}

/**
 * Get the status of the application via the CGAS API endpoint (that itself uses the `getCGASStatus` function).
 * @param markerOnly Whether to only return the marker (optional, defaults to false).
 * @param baseUrl The base URL of the CGAS API (optional, defaults to "/api/cgas").
 * @returns The status of the application, or the marker if `markerOnly` is true.
 */
export async function getCGASStatus(markerOnly: true, baseUrl?: string): Promise<RequestResult<string>>
export async function getCGASStatus(markerOnly?: false, baseUrl?: string): Promise<RequestResult<CGASStatus>>
export async function getCGASStatus(
	markerOnly = false,
	baseUrl = "/api/cgas",
): Promise<RequestResult<CGASStatus | string>> {
	const response = await fetch(`${baseUrl}/status?markerOnly=${markerOnly}`)

	const result = await response.json()
	return result
}
