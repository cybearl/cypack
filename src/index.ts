import { type CGASStatus, type CGASStatusResponse, getCGASStatus } from "@/cgas/status"
import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/general/bench"
import * as constants from "@/general/constants"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/general/errors"
import { formatHRTime, formatPercentage, formatTime, formatUnit } from "@/general/formats"
import { getHostname } from "@/general/host"
import { stringify } from "@/general/json"
import logger from "@/general/logger"
import { addParamsToUrl } from "@/general/urls"
import useAnimationFrame from "@/react/hooks/useAnimationFrame"
import useCanvas from "@/react/hooks/useCanvas"
import useInterval from "@/react/hooks/useInterval"
import useMouseCoordinates from "@/react/hooks/useMouseCoordinates"
import type { FailedRequest, RequestResult, SuccessfulRequest } from "@/types/requests"

export {
	// Bench
	Bench,
	// Configurations
	constants,
	// CGAS
	getCGASStatus,
	// Errors
	BaseErrors,
	formatErrorResponse,
	stringifyError,
	// Formats
	formatUnit,
	formatHRTime,
	formatTime,
	formatPercentage,
	// Host
	getHostname,
	// JSON
	stringify,
	// Logger
	logger,
	// URLs
	addParamsToUrl,
	// React hooks
	useAnimationFrame,
	useCanvas,
	useInterval,
	useMouseCoordinates,
}

/**
 * All types of the package.
 */
export type {
	// CGAS
	CGASStatus,
	CGASStatusResponse,
	// Bench
	BenchmarkResult,
	BenchmarkResults,
	// Errors
	ErrorObj,
	ErrorObjAdditionalData,
	// Requests
	SuccessfulRequest,
	FailedRequest,
	RequestResult,
}
