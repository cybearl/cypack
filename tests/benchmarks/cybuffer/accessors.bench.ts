import { Bench, CyBuffer } from "@/backend"

/**
 * Runs the CyBuffer accessors benchmarks.
 * @param benchmarkInputSize The size of the buffers used in the benchmarks.
 * @param benchmarkDuration The duration of each benchmark in milliseconds.
 */
export default function executeAccessorsBenchmark(benchmarkInputSize: number, benchmarkDuration: number) {
    // Test buffer instances
    const buffer = CyBuffer.alloc(benchmarkInputSize)

    // Benchmark
    const bench = new Bench(benchmarkDuration)

    bench.benchmark(() => buffer[0], "proxy => [] operator (get)")

    bench.benchmark(() => {
        buffer[0] = 0x01
    }, "proxy => [] operator (set)")

    bench.benchmark(() => {
        for (const value of buffer) {
            // Access the value to avoid the loop being optimized out
            value + 1
        }
    }, "symbol iterator")

    bench.benchmark(() => {
        for (const [index, value] of buffer.entries()) {
            // Access the index and value to avoid the loop being optimized out
            index + value
            value + 1
        }
    }, "entries")

    bench.print("accessors")
}
