import { arrayEqual, isClient, isServer } from "@/main/checks"
import CyCONSTANTS from "@/main/constants"
import Country, { COUNTRIES_SELECT_FIELD, formatCountryName, getCountryNameFromCode } from "@/main/countries"
import { checkEnvironmentVariables, type RequiredEnvVars } from "@/main/env"
import {
    BaseErrors,
    formatErrorResponse,
    formatMessageAsStringifiedError,
    parseCRUDError,
    stringifyError,
} from "@/main/errors"
import {
    bigintToMetricFormatted,
    bigintToScientific,
    formatBytes,
    formatDate,
    formatHRTime,
    formatPercentage,
    formatRelativeTime,
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
import {
    createNextLogger,
    generateNextLoggerPrefix,
    NEXT_LOG_INDICATORS,
    type NextLoggerInstance,
    type NextLoggerOptions,
    nextLogger,
} from "@/main/nextLogger"
import { convertErrorToString, decodeObjectURIComponents } from "@/main/strings"
import { applyHexColorOpacity, invertHexColor, shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { ErrorObj, FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export type {
    CGASStatus,
    // CGAS
    CGASStatusString,
    // Errors
    ErrorObj,
    FailedRequest,
    // Logger
    NextLoggerInstance,
    NextLoggerOptions,
    RequestResult,
    // Env
    RequiredEnvVars,
    // Requests
    SuccessfulRequest,
}
export {
    applyHexColorOpacity,
    // Checks
    arrayEqual,
    BaseErrors,
    bigintToMetricFormatted,
    bigintToScientific,
    COUNTRIES_SELECT_FIELD,
    // Countries
    Country,
    // Constants
    CyCONSTANTS,
    // Env
    checkEnvironmentVariables,
    // Strings
    convertErrorToString,
    createNextLogger,
    decodeObjectURIComponents,
    formatBytes,
    formatCountryName,
    formatDate,
    // Errors
    formatErrorResponse,
    formatHRTime,
    // JSON
    formatJson,
    formatMessageAsStringifiedError,
    formatPercentage,
    formatRelativeTime,
    formatTime,
    formatUnit,
    // Middleware
    fullyPermissiveCspHeader,
    generateNextLoggerPrefix,
    getCountryNameFromCode,
    invertHexColor,
    isClient,
    isServer,
    // Formats
    isValidIntId,
    isValidSlug,
    // Maths
    mapRange,
    // Logger
    NEXT_LOG_INDICATORS,
    nextLogger,
    parseCRUDError,
    parseQueryNumberArray,
    parseQueryStringArray,
    safeAverage,
    safePercentage,
    // Styling
    shadeColor,
    slugifyName,
    stringify,
    stringifyError,
    truncateString,
}
