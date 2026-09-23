import { Bench, CyBuffer } from "@/backend"

/**
 * Runs the CyBuffer internal benchmarks.
 * @param benchmarkInputSize The size of the buffers used in the benchmarks.
 * @param benchmarkDuration The duration of each benchmark in milliseconds.
 */
export default function executeInternalBenchmark(benchmarkInputSize: number, benchmarkDuration: number) {
    // Test buffer instances
    const buffer = CyBuffer.alloc(benchmarkInputSize)

    // Benchmark
    const bench = new Bench(benchmarkDuration)

    bench.benchmark(() => buffer.getPlatformEndianness(), "getPlatformEndianness")
    bench.benchmark(() => buffer.normalizeEndianness("BE"), "normalizeEndianness(BE)")
    bench.benchmark(() => buffer.normalizeEndianness("LE"), "normalizeEndianness(LE)")
    bench.benchmark(() => buffer.check(0, 1), "check")
    bench.print("internal")
}
