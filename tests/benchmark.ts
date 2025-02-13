import logger from "@/backend/logger"
import dedent from "dedent-js"
import minimist from "minimist"
import executeAccessorsBenchmark from "tests/benchmarks/cybuffer/accessors.bench"
import executeCheckBenchmark from "tests/benchmarks/cybuffer/check.bench"
import executeConversionBenchmark from "tests/benchmarks/cybuffer/conversion.bench"
import executeInternalBenchmark from "tests/benchmarks/cybuffer/internal.bench"
import executeRandomnessBenchmark from "tests/benchmarks/cybuffer/randomness.bench"
import executeReadBenchmark from "tests/benchmarks/cybuffer/read.bench"
import executeStaticBenchmark from "tests/benchmarks/cybuffer/static.bench"
import executeUtilityBenchmark from "tests/benchmarks/cybuffer/utility.bench"
import executeWriteBenchmark from "tests/benchmarks/cybuffer/write.bench"

// Disable the logger output for the benchmarks
logger.setShowLevel(false)
logger.setShowTimestamp(false)

/**
 * The help message.
 */
const helpMessage = dedent`
    Usage: npm run bench [options]

    Options:
        -b, --benchmark <name>          Run a specific benchmark.
        -b, --benchmark <prefix>::*     Run all benchmarks with the specified prefix.
        -i, --benchmarkInputSize        The input size for the CyBuffer benchmark.
        -d, --benchmarkDuration         The duration of the benchmark in milliseconds.
        -l, --list                      List all available benchmarks.
        -h, --help                      Display this help message.
`

/**
 * The type definition for a benchmark function.
 */
type BenchmarkFunction = (benchmarkInputSize: number, benchmarkDuration: number) => void

/**
 * Benchmark routing.
 */
const benchmarks: { [key: string]: BenchmarkFunction | BenchmarkFunction } = {
	"CyBuffer::internal": executeInternalBenchmark,
	"CyBuffer::accessors": executeAccessorsBenchmark,
	"CyBuffer::static": executeStaticBenchmark,
	"CyBuffer::write": executeWriteBenchmark,
	"CyBuffer::read": executeReadBenchmark,
	"CyBuffer::conversion": executeConversionBenchmark,
	"CyBuffer::check": executeCheckBenchmark,
	"CyBuffer::randomness": executeRandomnessBenchmark,
	"CyBuffer::utility": executeUtilityBenchmark,
}

/**
 * Main function to route the benchmarks depending on the command line arguments.
 * @param args Arguments from the command line.
 */
function main(args: string[]) {
	const argv = minimist(args.slice(2))

	if (argv.help || argv.h) {
		logger.info(helpMessage)
		process.exit(0)
	}

	if (argv.list || argv.l) {
		logger.info("Available benchmarks:")
		for (const benchmarkName in benchmarks) logger.info(`- ${benchmarkName}`)

		// Also add all ::* benchmarks
		const listOfPrefixes = new Set<string>()

		for (const benchmarkName in benchmarks) {
			const prefix = benchmarkName.split("::")[0]
			listOfPrefixes.add(prefix)
		}

		for (const prefix of listOfPrefixes) {
			logger.info(`- ${prefix}::*`)
		}

		process.exit(0)
	}

	logger.info("Starting benchmarks...")

	const argBenchmarkName = argv.benchmark || argv.b
	let argBenchmarkInputSize = argv.BenchmarkInputSize || argv.c
	let argBenchmarkDuration = argv.benchmarkDuration || argv.d

	logger.info(">> Running CyBuffer benchmarks...")

	if (argBenchmarkInputSize) {
		logger.info(`>> Using benchmark input size of ${argBenchmarkInputSize} bytes.`)
	} else {
		logger.info(">> No benchmark input size provided, using default value of 128 bytes.")
		argBenchmarkInputSize = 128
	}

	if (argBenchmarkDuration) {
		logger.info(`>> Using benchmark duration of ${argBenchmarkDuration} milliseconds.`)
	} else {
		logger.info(">> No benchmark duration provided, using default value of 256 milliseconds.")
		argBenchmarkDuration = 256
	}

	if (!argBenchmarkName) logger.info(">> No benchmark name provided, running all benchmarks...")

	logger.warn("\nThis might take a while depending on the benchmark duration you chose.")
	logger.warn("Please be patient and wait for the results to appear.\n")

	if (argBenchmarkName) {
		if (benchmarks[argBenchmarkName]) {
			benchmarks[argBenchmarkName](argBenchmarkInputSize, argBenchmarkDuration)
		} else if (argBenchmarkName.endsWith("::*")) {
			const prefix = argBenchmarkName.slice(0, -3)

			for (const benchmarkName in benchmarks) {
				if (benchmarkName.startsWith(prefix)) {
					benchmarks[benchmarkName](argBenchmarkInputSize, argBenchmarkDuration)
				}
			}
		} else {
			logger.error(`[ERROR] Benchmark "${argBenchmarkName}" not found.\n`)
			process.exit(1)
		}
	} else {
		for (const benchmarkName in benchmarks) {
			benchmarks[benchmarkName](argBenchmarkInputSize, argBenchmarkDuration)
		}
	}
}

main(process.argv)
