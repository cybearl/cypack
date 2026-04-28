import { stringify } from "@/main/json"

/**
 * A set of colored Next.js-compatible ANSI indicators for console log messages.
 */
export const NEXT_LOG_INDICATORS = {
    success: "\x1b[32m ✓ \x1b[0m",
    warning: "\x1b[35m ⚠ \x1b[0m",
    error: "\x1b[31m ✗ \x1b[0m",
    info: "\x1b[33m ○ \x1b[0m",
    debug: "\x1b[34m ▷ \x1b[0m",
}

/**
 * Options accepted by each log method.
 */
export type NextLoggerOptions = {
    /** Overrides the logger's default prefix for this call. */
    prefix?: string
    /** Additional data to log alongside the message (e.g., an Error object). */
    data?: unknown
}

/**
 * A logger instance returned by `createNextLogger` or `withPrefix`.
 */
export type NextLoggerInstance = {
    success: (message: string, options?: NextLoggerOptions) => void
    warn: (message: string, options?: NextLoggerOptions) => void
    error: (message: string, options?: NextLoggerOptions) => void
    info: (message: string, options?: NextLoggerOptions) => void
    debug: (message: string, options?: NextLoggerOptions) => void
    /** Returns a new logger instance with the given prefix fixed as its default. */
    withPrefix: (prefix: string) => NextLoggerInstance
}

/**
 * Creates an isomorphic Next.js-compatible logger that works in both browser and Node.js environments.
 * ANSI indicators are automatically hidden in browser environments.
 * @param defaultPrefix An optional prefix prepended to all messages as `[prefix]`.
 * @param prefixLength The total character width reserved for the prefix column, used to
 * align messages across loggers with different prefix lengths (optional, defaults to 10).
 */
export function createNextLogger(defaultPrefix?: string, prefixLength = 10): NextLoggerInstance {
    function emit(indicator: string, fn: (...args: unknown[]) => void, message: string, options?: NextLoggerOptions) {
        const isClient = typeof window !== "undefined"

        let paddedPrefix = ""
        const prefix = options?.prefix ?? defaultPrefix
        if (prefix) paddedPrefix = `[${prefix}]${isClient ? " " : " ".repeat(prefixLength - (prefix.length + 2))}`

        const formattedLog = `${isClient ? "" : indicator}${paddedPrefix}${message}`

        if (options?.data === undefined) {
            fn(formattedLog)
        } else {
            const dataString = stringify(options.data, 2)
                .split("\n")
                .map(line => (isClient ? line : `   ${line}`))
                .join("\n")

            fn(`${formattedLog}:`, `\n${dataString}`)
        }
    }

    return {
        success: (message, options) => emit(NEXT_LOG_INDICATORS.success, console.log, message, options),
        warn: (message, options) => emit(NEXT_LOG_INDICATORS.warning, console.warn, message, options),
        error: (message, options) => emit(NEXT_LOG_INDICATORS.error, console.error, message, options),
        info: (message, options) => emit(NEXT_LOG_INDICATORS.info, console.log, message, options),
        debug: (message, options) => emit(NEXT_LOG_INDICATORS.debug, console.debug, message, options),
        withPrefix: prefix => createNextLogger(prefix, prefixLength),
    }
}

/**
 * A thin isomorphic Next.js-compatible logger instance usable in both browser and Node.js environments.
 */
export const nextLogger = createNextLogger()

/**
 * Generates a short logger prefix from a UUID, optionally scoped by a label.
 * @param uuid The UUID to derive the prefix from.
 * @param prefix An optional label to prepend (e.g., "worker" → "worker-a1b").
 * @returns A short prefix string like "a1b" or "worker-a1b".
 */
export function generateNextLoggerPrefix(uuid: string, prefix?: string): string {
    return `${prefix ? `${prefix}-` : ""}${uuid.replaceAll("-", "").slice(0, 3)}`
}
