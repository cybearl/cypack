import { type Status, type StatusResponse, getStatus } from "@/cgas/status"
import * as constants from "@/general/constants"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/general/errors"
import { getHostname } from "@/general/host"
import { stringify } from "@/general/json"
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
	constants,
	errors: {
		BaseErrors,
		formatErrorResponse,
		stringifyError,
	},
	host: {
		getHostname,
	},
	json: {
		stringify,
	},
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
	// General - Errors
	ErrorObj,
	ErrorObjAdditionalData,
	// General - Requests
	SuccessfulRequest,
	FailedRequest,
	RequestResult,
}
