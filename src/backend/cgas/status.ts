import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"

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
