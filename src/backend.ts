import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/backend/bench"
import { generateCGASStatus } from "@/backend/cgas/status"
import {
	BaseErrors,
	type ErrorObj,
	type ErrorObjAdditionalData,
	formatErrorResponse,
	stringifyError,
} from "@/backend/errors"
import { getHostname } from "@/backend/host"
import logger from "@/backend/logger"

export {
	// Bench
	Bench,
	// CGAS
	generateCGASStatus,
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
	// Errors
	ErrorObj,
	ErrorObjAdditionalData,
}
