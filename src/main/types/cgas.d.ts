/**
 * The type for the CGAS status string, only "enabled" makes the application available
 * to the public, "disabled", "in-maintenance" and "in-development" do not.
 */
export type CGASStatusString = "enabled" | "disabled" | "in-maintenance" | "in-development"

/**
 * The Cybearl General API System (CGAS) status response, its status allows to
 * enable/disable the application (see "CGASStatusString").
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
