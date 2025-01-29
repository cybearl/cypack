import type { CGASStatus } from "@/main/types/cgas"
import type { RequestResult } from "@/main/types/requests"

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
	return result as RequestResult<CGASStatus | string>
}
