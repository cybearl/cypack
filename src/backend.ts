import Bench, { type BenchmarkResult, type BenchmarkResults } from "@/backend/bench"
import { generateCGASStatus } from "@/backend/cgas/status"
import { type CryptoAes256GcmEncryptResult, crypto } from "@/backend/crypto"
import CyBuffer, { type Bit, type Endianness, type StringEncoding } from "@/backend/cybuffer"

import { getHostname } from "@/backend/host"
import logger from "@/backend/logger"
import NextApiWrapper, { type NextApiMethodInput } from "@/backend/next/nextApiWrapper"
import NextAuthApiWrapper, { type NextAuthApiMethodInput } from "@/backend/next/nextAuthApiWrapper"

export {
    // Bench
    Bench,
    // Crypto
    crypto,
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
    NextAuthApiWrapper,
}

export type {
    // Bench
    BenchmarkResult,
    BenchmarkResults,
    // Crypto
    CryptoAes256GcmEncryptResult,
    // CyBuffer
    Bit,
    Endianness,
    StringEncoding,
    // Next.js API Wrapper
    NextApiMethodInput,
    NextAuthApiMethodInput,
}
