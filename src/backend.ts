import { type CGASStatus, type CGASStatusString, generateCGASStatus, getCGASStatus } from "@/cgas/status"
import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/general/bench"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/general/errors"
import { getHostname } from "@/general/host"
import logger from "@/general/logger"
import type { FailedRequest, RequestResult, SuccessfulRequest } from "@/types/requests"

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
