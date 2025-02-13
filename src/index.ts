import { isClient, isServer } from "@/main/checks"
import CONSTANTS from "@/main/constants"

import { formatHRTime, formatPercentage, formatTime, formatUnit, truncateString } from "@/main/formats"

import { stringify } from "@/main/json"
import { mapRange } from "@/main/maths"
import { fullyPermissiveCspHeader } from "@/main/middleware"
import { convertErrorToString } from "@/main/strings"
import { shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { ErrorObj, FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export {
	// Checks
	isClient,
	isServer,
	// Configurations
	CONSTANTS,
	// Formats
	formatUnit,
	formatHRTime,
	formatTime,
	formatPercentage,
	truncateString,
	// JSON
	stringify,
	// Maths
	mapRange,
	// Middleware
	fullyPermissiveCspHeader,
	// Strings
	convertErrorToString,
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
