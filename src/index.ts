import { isClient, isServer } from "@/main/checks"
import * as constants from "@/main/constants"

import { formatHRTime, formatPercentage, formatTime, formatUnit, truncateString } from "@/main/formats"

import { stringify } from "@/main/json"
import { mapRange } from "@/main/maths"
import { shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { ErrorObj, FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export {
	// Checks
	isClient,
	isServer,
	// Configurations
	constants,
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
