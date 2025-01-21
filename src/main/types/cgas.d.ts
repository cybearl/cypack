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
