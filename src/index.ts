import { type Status, type StatusResponse, getStatus } from "@/cgas/status"
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

/**
 * Space for the Cybearl General API System (CGAS).
 */
export const cyCGAS = {
	getStatus,
}

/**
 * Space for general utilities.
 */
export const cyGeneral = {
	Bench,
	constants,
	errors: {
		BaseErrors,
		formatErrorResponse,
		stringifyError,
	},
	formats: {
		formatUnit,
		formatHRTime,
		formatTime,
		formatPercentage,
	},
	host: {
		getHostname,
	},
	json: {
		stringify,
	},
	logger,
	urls: {
		addParamsToUrl,
	},
}

/**
 * Space for React.
 */
export const cyReact = {
	useAnimationFrame,
	useCanvas,
	useInterval,
	useMouseCoordinates,
}

/**
 * All types of the package.
 */
export type {
	// CGAS - Status
	Status,
	StatusResponse,
	// General - Bench
	BenchmarkResult,
	BenchmarkResults,
	// General - Errors
	ErrorObj,
	ErrorObjAdditionalData,
	// General - Requests
	SuccessfulRequest,
	FailedRequest,
	RequestResult,
}
