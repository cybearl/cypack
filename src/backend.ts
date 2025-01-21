import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/backend/bench"
import { type CGASStatus, type CGASStatusString, generateCGASStatus, getCGASStatus } from "@/backend/cgas/status"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/backend/errors"
import { getHostname } from "@/backend/host"
import logger from "@/backend/logger"
import { assertServer } from "@/main/checks"
import type { FailedRequest, RequestResult, SuccessfulRequest } from "@/types/requests"

// Checking that any code importing this module is running on a server environment
assertServer()

export {
	// Bench
	Bench,
	// CGAS
	generateCGASStatus,
	getCGASStatus,
	// Errors
	BaseErrors,
	formatErrorResponse,
	stringifyError,
	// Host
	getHostname,
	// Logger
	logger,
}

export type {
	// Bench
	BenchmarkResult,
	BenchmarkResults,
	// CGAS
	CGASStatusString,
	CGASStatus,
	// Errors
	ErrorObj,
	ErrorObjAdditionalData,
	// Requests
	SuccessfulRequest,
	FailedRequest,
	RequestResult,
}
