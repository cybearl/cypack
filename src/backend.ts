import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/backend/bench"
import { generateCGASStatus } from "@/backend/cgas/status"
import CyBuffer, { type Bit, type Endianness, type StringEncoding } from "@/backend/cybuffer"
import {
	BaseErrors,
	formatErrorResponse,
	formatMessageAsStringifiedError,
	parseCRUDError,
	stringifyError,
} from "@/backend/errors"
import { getHostname } from "@/backend/host"
import logger from "@/backend/logger"
import NextApiWrapper, { type NextApiMethodInput } from "@/backend/next/nextApiWrapper"

export {
	// Bench
	Bench,
	// CyBuffer
	CyBuffer,
	// CGAS
	generateCGASStatus,
	// Errors
	formatErrorResponse,
	stringifyError,
	parseCRUDError,
	formatMessageAsStringifiedError,
	BaseErrors,
	// Host
	getHostname,
	// Logger
	logger,
	// Next.js API Wrapper
	NextApiWrapper,
}

export type {
	// Bench
	BenchmarkResult,
	BenchmarkResults,
	// CyBuffer
	Bit,
	Endianness,
	StringEncoding,
	// Next.js API Wrapper
	NextApiMethodInput,
}
