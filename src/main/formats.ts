import slugifyLib from "slugify"
import CyCONSTANTS from "@/main/constants"

/**
 * The slugify function from the slugify library.
 */
const slugify = (slugifyLib as any).default || slugifyLib

/**
 * Validate a direct ID parameter (as integer for SQL DBs etc..).
 * @param id The ID to validate.
 * @returns True if the ID is valid, false otherwise.
 */
export function isValidIntId(id: string): boolean {
    return typeof id === "string" && id.length > 0 && Number.isInteger(Number(id)) && Number(id) >= 0
}

/**
 * Validates a slug.
 * @param slug The slug to validate.
 * @returns True if the slug is valid, false otherwise.
 */
export function isValidSlug(slug: string): boolean {
    return typeof slug === "string" && slug.length > 0 && CyCONSTANTS.SLUG_REGEX.test(slug)
}

/**
 * Format a number with an attached unit + an optional time unit.
 *
 * **Note:** The time unit can be set to null to only display the unit.
 * @param num The number to format.
 * @param unit The unit to use (optional, defaults to "Op").
 * @param timeUnit The time unit to use (optional, defaults to "s").
 * @param padding The padding to use (optional, defaults to 12).
 * @param addSpaceBeforeUnit Whether to add a space before the unit (optional, defaults to `true`).
 * @returns The formatted string.
 */
export function formatUnit(
    num: number,
    unit: string | null = "Op",
    timeUnit: string | null = "s",
    padding = 12,
    addSpaceBeforeUnit = true,
): string {
    let strUnit: string

    if (typeof unit === "string" && typeof timeUnit === "string") {
        strUnit = `${unit}/${timeUnit}`
    } else if (typeof unit === "string") {
        strUnit = unit
    } else {
        strUnit = ""
    }

    // Add a space before the unit if needed
    const spaceOrNot = addSpaceBeforeUnit ? " " : ""

    // Y = yotta
    if (num >= 10 ** 24) {
        return `${(num / 10 ** 24).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}Y${strUnit}`.padStart(padding, " ")
    }

    // E = exa
    if (num >= 10 ** 18) {
        return `${(num / 10 ** 18).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}E${strUnit}`.padStart(padding, " ")
    }

    // P = peta
    if (num >= 10 ** 15) {
        return `${(num / 10 ** 15).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}P${strUnit}`.padStart(padding, " ")
    }

    // T = tera
    if (num >= 10 ** 12) {
        return `${(num / 10 ** 12).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}T${strUnit}`.padStart(padding, " ")
    }

    // G = giga
    if (num >= 10 ** 9) {
        return `${(num / 10 ** 9).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}G${strUnit}`.padStart(padding, " ")
    }

    // M = mega
    if (num >= 10 ** 6) {
        return `${(num / 10 ** 6).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}M${strUnit}`.padStart(padding, " ")
    }

    // k = kilo
    if (num >= 10 ** 3) {
        return `${(num / 10 ** 3).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${spaceOrNot}k${strUnit}`.padStart(padding, " ")
    }

    return `${num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}${spaceOrNot}${strUnit}`.padStart(padding, " ")
}

/**
 * Format a high-resolution time, into a responsive string with the en-US locale format.
 * @param hrtime The hrtime in nanoseconds.
 * @param padding The padding to use (optional, defaults to 8).
 * @returns The formatted string.
 */
export function formatHRTime(hrtime: bigint | number, padding = 8): string {
    // Hours
    if (hrtime >= 3600000000000000n) {
        return `${(Number(hrtime) / 3600000000000000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}h`.padStart(padding, " ")
    }

    // Minutes
    if (hrtime >= 60000000000n) {
        return `${(Number(hrtime) / 60000000000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}m`.padStart(padding, " ")
    }

    // Seconds
    if (hrtime >= 1000000000n) {
        return `${(Number(hrtime) / 1000000000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}s`.padStart(padding, " ")
    }

    // Milliseconds
    if (hrtime >= 1000000n) {
        return `${(Number(hrtime) / 1000000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}ms`.padStart(padding, " ")
    }

    // Microseconds
    if (hrtime >= 1000n) {
        return `${(Number(hrtime) / 1000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}µs`.padStart(padding, " ")
    }

    // Nanoseconds
    return `${hrtime.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}ns`.padStart(padding, " ")
}

/**
 * Format a time in milliseconds into a responsive string with the en-US locale format.
 * @param time The time in milliseconds.
 * @param padding The padding to use (optional, defaults to 10).
 * @returns The formatted string.
 */
export function formatTime(time: number, padding = 10): string {
    // Hours
    if (time >= 3600000) {
        return `${(time / 3600000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}h`.padStart(padding, " ")
    }

    // Minutes
    if (time >= 60000) {
        return `${(time / 60000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}m`.padStart(padding, " ")
    }

    // Seconds
    if (time >= 1000) {
        return `${(time / 1000).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}s`.padStart(padding, " ")
    }

    // Milliseconds
    return `${time.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}ms`.padStart(padding, " ")
}

/**
 * Format a percentage with the en-US locale format.
 * @param percentage The percentage to format.
 * @param padding The padding to use (optional, defaults to 7).
 * @returns The formatted string.
 */
export function formatPercentage(percentage: number, padding = 7): string {
    return `${percentage.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}%`.padStart(padding, " ")
}

/**
 * Truncate a string to a certain length.
 * @param str The string to truncate.
 * @param len The maximum length of the string.
 * @returns The truncated string.
 */
export function truncateString(str: string, len: number) {
    if (str.length <= len) return str
    return `${str.slice(0, len)}...`
}

/**
 * Parse a query containing either a number or numbers separated by commas and returns an array of numbers.
 * @param query The query string to parse.
 * @returns An array of numbers extracted from the query.
 */
export function parseQueryNumberArray(query: string | Array<string>): number[] {
    const result: number[] = []
    const items = Array.isArray(query) ? query : query.split(",").map(item => item.trim())

    for (const item of items) {
        const num = Number.parseInt(item, 10)
        if (!Number.isNaN(num)) result.push(num)
    }

    return result
}

/**
 * Parse a query containing either a string or strings separated by commas and returns an array of strings.
 * @param query The query string to parse.
 * @returns An array of strings extracted from the query.
 */
export function parseQueryStringArray(query: string | Array<string>): string[] {
    const result: string[] = []
    const items = Array.isArray(query) ? query : query.split(",").map(item => item.trim())

    for (const item of items) {
        if (item.length > 0) result.push(item)
    }

    return result
}

/**
 * The options for the `slugify` function.
 */
const slugifyOptions = {
    lower: true,
    strict: true,
}

/**
 * Slugify a given name with support for automatic number incrementing.
 * @param name The name to slugify.
 * @param previousSlug An optional previous slug to compare against,
 * the previous slug should ends with `-<number>`, this slug will automatically
 * increment the number if the slug already exists.
 * @returns The slugified version of the name.
 */
export function slugifyName(name: string, previousSlug?: string): string {
    if (previousSlug) {
        // If the previous slug ends with a number, we increment it
        const match = previousSlug.match(/-(\d+)$/)

        if (match) {
            const number = Number.parseInt(match[1], 10)
            const baseSlug = previousSlug.slice(0, -match[0].length)
            return slugify(`${baseSlug}-${number + 1}`, slugifyOptions)
        }
    }

    return slugify(name, slugifyOptions)
}

/**
 * Formats a date as a human-readable relative time string.
 * Falls back to a locale date string for dates older than 24 hours.
 * @param date The date to format.
 * @returns A string like "just now", "5m ago", "3h ago", or a locale date string.
 */
export function formatRelativeTime(date: Date): string {
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000)
    if (diffSec < 60) return "just now"

    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin}m ago`

    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return `${diffHour}h ago`

    return date.toLocaleDateString()
}

/**
 * Formats a date into a locale-aware datetime string using the runtime's default locale.
 * @param date The date to format.
 * @returns The formatted date string (e.g., "04/25/2026, 03:45:00 PM").
 */
export function formatDate(date: Date): string {
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    })
}

/**
 * Formats a bigint as scientific notation using only integer arithmetic,
 * supporting arbitrarily large values (e.g., up to 2^256).
 *
 * Returns a tuple `[coefficient, exponent]` so callers can render the
 * exponent as a superscript (e.g., `["4.61", 18]` for ~4.61 × 10^18).
 * @param value The bigint to format.
 * @param precision Number of decimal digits in the coefficient (default 2).
 */
export function bigintToScientific(value: bigint, precision = 2): [coefficient: string, exponent: number] {
    if (value === 0n) return ["0", 0]

    const digits = value.toString()
    const exponent = digits.length - 1

    if (exponent === 0) return [digits, 0]

    const raw = `${digits[0]}.${digits.slice(1, precision + 1).padEnd(precision, "0")}`
    const coefficient = raw.replace(/\.?0+$/, "")

    return [coefficient, exponent]
}

/**
 * Converts a bigint to an en-US formatted string with metric prefixes (e.g., 1500 -> "1.5k").
 * Supports values up to exa (E).
 * @param value The bigint to format.
 * @returns The formatted string with metric prefix.
 */
export function bigintToMetricFormatted(value: bigint): string {
    const isNegative = value < 0n
    const absValue = value < 0n ? -value : value

    const units = ["", "k", "M", "G", "T", "P", "E"]
    const valueString = absValue.toString()
    let unitIndex = Math.floor((valueString.length - 1) / 3)

    if (unitIndex >= units.length) unitIndex = units.length - 1
    if (unitIndex <= 0) return value.toString()

    const divisor = 1000n ** BigInt(unitIndex)
    const scaled = (absValue * 10n) / divisor
    const scaledStr = scaled.toString()
    const paddedScaledStr = scaledStr.padStart(2, "0")
    const integerPart = paddedScaledStr.slice(0, -1) || "0"
    const decimalPart = paddedScaledStr.slice(-1)

    const sign = isNegative ? "-" : ""
    const unit = units[unitIndex]

    return decimalPart === "0" ? `${sign}${integerPart}${unit}` : `${sign}${integerPart}.${decimalPart}${unit}`
}

/**
 * Formats a number of bytes into a human-readable string with appropriate units.
 * @param bytes The number of bytes.
 * @param decimalPlaces The number of decimal places to include (optional, defaults to 2).
 * @returns The formatted string.
 */
export function formatBytes(bytes: number, decimalPlaces = 2): string {
    if (bytes === 0) return "0 Bytes"

    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${parseFloat((bytes / 1024 ** i).toFixed(decimalPlaces < 0 ? 0 : decimalPlaces))} ${sizes[i]}`
}
