import { fallbackCGASStatus, getCGASStatus } from "@/frontend/cgas/status"
import { type CSSDelay, cn, convertCssDelayToMs } from "@/frontend/styling"
import { addParamsToUrl, currentUrlOrigin } from "@/frontend/urls"

export {
    // CGAS
    getCGASStatus,
    fallbackCGASStatus,
    // Styling
    cn,
    convertCssDelayToMs,
    // URLs
    addParamsToUrl,
    currentUrlOrigin,
}

export type {
    // Styling
    CSSDelay,
}
