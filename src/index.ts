import { assertServer, isServer } from "@/main/checks"
import * as constants from "@/main/constants"

import { formatHRTime, formatPercentage, formatTime, formatUnit, truncateString } from "@/main/formats"

import { stringify } from "@/main/json"
import logger from "@/main/logger"
import { mapRange } from "@/main/maths"
import { shadeColor } from "@/main/styling"
import type { CGASStatus, CGASStatusString } from "@/main/types/cgas"
import type { FailedRequest, RequestResult, SuccessfulRequest } from "@/main/types/requests"

export {
	// Checks
	isServer,
	assertServer,
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
	// Logger
	logger,
	// Maths
	mapRange,
	// Styling
	shadeColor,
}

export type {
	// CGAS
	CGASStatusString,
	CGASStatus,
	// Requests
	SuccessfulRequest,
	FailedRequest,
	RequestResult,
}
