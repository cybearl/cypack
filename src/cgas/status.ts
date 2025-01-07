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
