/**
 * Status of an application (allows to enable/disable the application),
 * It can either be:
 * - `enabled`: The application is enabled and available to the public.
 * - `disabled`: The application is disabled and not available to the public.
 * - `in-maintenance`: The application is in maintenance mode and not available to the public.
 * - `in-development`: The application is in development mode and not available to the public.
 */
export type AppStatus = "enabled" | "disabled" | "in-maintenance" | "in-development"

/**
 * The returned status object from the `getStatus` function.
 */
export type StatusObj = {
	status: AppStatus
	marker: string
	timestamp: string
	version: {
		raw: string
		formatted: string
	}
	message: string
}

/**
 * A function that returns a standardized CGAS status object.
 */
export function getStatus(): StatusObj {}
