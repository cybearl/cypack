import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/backend/bench"
import { generateCGASStatus } from "@/backend/cgas/status"
import { cryptoAes256Gcm } from "@/backend/crypto"
import CyBuffer, { type Bit, type Endianness, type StringEncoding } from "@/backend/cybuffer"

import { getHostname } from "@/backend/host"
import logger from "@/backend/logger"
import NextApiWrapper, { type NextApiMethodInput } from "@/backend/next/nextApiWrapper"

export {
	// Bench
	Bench,
	// Crypto
	cryptoAes256Gcm,
	// CyBuffer
	CyBuffer,
	// CGAS
	generateCGASStatus,
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
