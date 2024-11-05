import { type Status, type StatusResponse, getStatus } from "@/cgas/status"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/general/errors"
import useAnimationFrame from "@/react/hooks/useAnimationFrame"
import useCanvas from "@/react/hooks/useCanvas"
import useInterval from "@/react/hooks/useInterval"
import useMouseCoordinates from "@/react/hooks/useMouseCoordinates"
import type { FailedRequest, RequestResult, SuccessfulRequest } from "@/types/requests"

/**
 * Space for the Cybearl General API System (CGAS).
 */
export const cgas = {
	getStatus,
}

/**
 * Space for general utilities.
 */
export const general = {
	formatErrorResponse,
	stringifyError,
	BaseErrors,
}

/**
 * Space for React.
 */
export const react = {
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
