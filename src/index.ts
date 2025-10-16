import { isClient, isServer } from "@/main/checks"
import CyCONSTANTS from "@/main/constants"
import {
    BaseErrors,
    formatErrorResponse,
    formatMessageAsStringifiedError,
    parseCRUDError,
    stringifyError,
} from "@/main/errors"
import {
    formatHRTime,
    formatPercentage,
    formatTime,
    formatUnit,
    isValidIntId,
    isValidSlug,
    parseQueryNumberArray,
    parseQueryStringArray,
    slugifyName,
    truncateString,
} from "@/main/formats"
import { formatJson, stringify } from "@/main/json"
import { mapRange, safeAverage, safePercentage } from "@/main/maths"
import { fullyPermissiveCspHeader } from "@/main/middleware"
import { convertErrorToString, decodeObjectURIComponents } from "@/main/strings"
import { shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { ErrorObj, FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export {
    // Checks
    isClient,
    isServer,
    // Configurations
    CyCONSTANTS,
    // Errors
    formatErrorResponse,
    stringifyError,
    parseCRUDError,
    formatMessageAsStringifiedError,
    BaseErrors,
    // Formats
    isValidIntId,
    isValidSlug,
    formatUnit,
    formatHRTime,
    formatTime,
    formatPercentage,
    truncateString,
    parseQueryNumberArray,
    parseQueryStringArray,
    slugifyName,
    // JSON
    formatJson,
    stringify,
    // Maths
    mapRange,
    safeAverage,
    safePercentage,
    // Middleware
    fullyPermissiveCspHeader,
    // Strings
    convertErrorToString,
    decodeObjectURIComponents,
    // Styling
    shadeColor,
}

export type {
    // CGAS
    CGASStatusString,
    CGASStatus,
    // Errors
    ErrorObj,
    // Requests
    SuccessfulRequest,
    FailedRequest,
    RequestResult,
}
