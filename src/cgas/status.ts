import type { RequestResult } from "@/types/requests"

/**
 * Status of the application (allows to enable/disable the application),
 * It can either be:
 * - `enabled`: The application is enabled and available to the public.
 * - `disabled`: The application is disabled and not available to the public.
 * - `in-maintenance`: The application is in maintenance mode and not available to the public.
 * - `in-development`: The application is in development mode and not available to the public.
 */
export type CGASStatus = "enabled" | "disabled" | "in-maintenance" | "in-development"

/**
 * The Cybearl General API System (CGAS) status response.
 */
export type CGASStatusResponse = {
	status: CGASStatus
	marker: string
	timestamp: string
	version: {
		raw: string
		formatted: `v${string}` | "unavailable"
	}
	message: string
}

/**
 * Returns the current status of the application.
 */
export function getCGASStatus(
	status: CGASStatus,
	marker: string,
	version: string | undefined,
	message?: string,
	markerOnly?: boolean,
): CGASStatusResponse | string {
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
 * Get the status of the application.
 * @param markerOnly Whether to only return the marker (optional, defaults to false).
 * @param baseUrl The base URL of the CGAS API (optional, defaults to "/api/cgas").
 * @returns The status of the application, or the marker if `markerOnly` is true.
 */
export async function getStatus(markerOnly: true, baseUrl?: string): Promise<RequestResult<string>>
export async function getStatus(markerOnly?: false, baseUrl?: string): Promise<RequestResult<CGASStatusResponse>>
export async function getStatus(
	markerOnly = false,
	baseUrl = "/api/cgas",
): Promise<RequestResult<CGASStatusResponse | string>> {
	const response = await fetch(`${baseUrl}/status?markerOnly=${markerOnly}`)

	const result = await response.json()
	return result
}
