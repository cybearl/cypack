import { nextLogger } from "@/main/logger"

/**
 * The shape of the required environment variables config, split by visibility scope.
 */
export type RequiredEnvVars = {
    /** Variable names that must be present in both server and client environments. */
    public: string[]
    /** Variable names that must be present on the server but must NOT be exposed to the client. */
    private: string[]
}

/**
 * Checks for required environment variables and warns or throws if any are missing
 * or if private variables are leaking into the client bundle.
 *
 * Pass your app's required-var names as `requiredVars` and a flat record of their
 * actual runtime values as `runtimeValues`. The `runtimeValues` object must inline
 * `process.env.X` calls directly, dynamic key access (`process.env[name]`) is
 * dead-code eliminated by most bundlers and will not work.
 *
 * @param requiredVars The required variable names split into `public` and `private`.
 * @param runtimeValues A flat map of variable name → `process.env.X` value.
 */
export function checkEnvironmentVariables(
    requiredVars: RequiredEnvVars,
    runtimeValues: Record<string, string | undefined>,
): void {
    if (requiredVars.public.length === 0 && requiredVars.private.length === 0) return

    // `typeof window` returns "undefined" on the server and "object" on the client
    const environment = typeof window === "undefined" ? "server" : "client"

    // Determine which environment variables to check based on the current environment
    const toCheck = environment === "server" ? requiredVars.private : requiredVars.public
    const missingVars = toCheck.filter(name => runtimeValues[name] === undefined)

    if (missingVars.length > 0) {
        const message = `Missing required environment variables: ${missingVars.join(", ")}`

        if (process.env.NODE_ENV === "production") nextLogger.error(message)
        else throw new Error(message)
    } else {
        nextLogger.success(`All required environment variables are set for the '${environment}' environment.`)
    }

    if (environment === "client") {
        const leakedVars = requiredVars.private.filter(name => runtimeValues[name] !== undefined)

        if (leakedVars.length > 0) {
            const message = `Private environment variables exposed to the client: ${leakedVars.join(", ")}`

            if (process.env.NODE_ENV === "production") nextLogger.error(message)
            else throw new Error(message)
        }
    }
}
