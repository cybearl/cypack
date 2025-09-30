/**
 * Safely converts any error into a string for parsing/searching.
 * @param error The error to convert.
 * @returns The error as a string.
 */
export function convertErrorToString(error: unknown): string {
    if (typeof error === "string") return error

    let stringifiedError = ""
    try {
        stringifiedError = JSON.stringify(error)
    } catch (_) {
        // Ignore
    }

    if (stringifiedError === "" || stringifiedError === "{}") stringifiedError = `${error}`
    return stringifiedError
}

/**
 * Decodes all components of an object as URI components (e.g., for decoding Next.js `req.query`).
 * @param obj The object to decode.
 * @returns The decoded object.
 */
export function decodeObjectURIComponents(
    obj: Partial<{ [key: string]: string | string[] }>,
): Partial<{ [key: string]: string | string[] }> {
    for (const key in obj) {
        try {
            obj[key] = decodeURIComponent(String(obj[key]))
        } catch (_) {
            // Ignore decoding errors
        }
    }

    return obj
}
