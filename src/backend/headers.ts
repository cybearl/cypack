import type { IncomingHttpHeaders } from "node:http"

/**
 * Converts Node.js IncomingHttpHeaders to the Web API Headers format.
 * @param headers The incoming HTTP headers from Node.js.
 * @returns The headers as a Web API Headers object.
 */
export function convertNodeHeadersToWebHeaders(headers: IncomingHttpHeaders): Headers {
    const webHeaders = new Headers()

    for (const [key, value] of Object.entries(headers)) {
        if (Array.isArray(value)) {
            for (const v of value) {
                webHeaders.append(key, v)
            }
        } else if (value !== undefined) {
            webHeaders.append(key, value)
        }
    }

    return webHeaders
}
