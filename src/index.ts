import { arrayEqual, isClient, isServer } from "@/main/checks"
import { type RequiredEnvVars, checkEnvironmentVariables } from "@/main/env"
import CyCONSTANTS from "@/main/constants"
import Country, { COUNTRIES_SELECT_FIELD, formatCountryName, getCountryNameFromCode } from "@/main/countries"
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
import {
    LOG_INDICATORS,
    type LoggerInstance,
    type LoggerOptions,
    createLogger,
    generateLoggerPrefix,
    logger,
} from "@/main/logger"
import { mapRange, safeAverage, safePercentage } from "@/main/maths"
import { fullyPermissiveCspHeader } from "@/main/middleware"
import { convertErrorToString, decodeObjectURIComponents } from "@/main/strings"
import { applyHexColorOpacity, invertHexColor, shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { ErrorObj, FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export {
    // Checks
    arrayEqual,
    isClient,
    isServer,
    // Env
    checkEnvironmentVariables,
    // Constants
    CyCONSTANTS,
    // Countries
    Country,
    formatCountryName,
    COUNTRIES_SELECT_FIELD,
    getCountryNameFromCode,
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
    formatBytes,
    formatRelativeTime,
    formatDate,
    bigintToScientific,
    bigintToMetricFormatted,
    // JSON
    formatJson,
    stringify,
    // Logger
    LOG_INDICATORS,
    createLogger,
    generateLoggerPrefix,
    logger,
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
    invertHexColor,
    applyHexColorOpacity,
}

export type {
    // CGAS
    CGASStatusString,
    CGASStatus,
    // Env
    RequiredEnvVars,
    // Errors
    ErrorObj,
    // Requests
    SuccessfulRequest,
    FailedRequest,
    RequestResult,
    // Logger
    LoggerInstance,
    LoggerOptions,
}
