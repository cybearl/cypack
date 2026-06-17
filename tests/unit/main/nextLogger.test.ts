import { afterEach, beforeEach, describe, type MockInstance, test, vi } from "vitest"
import { createNextLogger, generateNextLoggerPrefix, NEXT_LOG_INDICATORS, nextLogger } from "@/main/nextLogger"

describe("nextLogger", () => {
    const originalWindow = (globalThis as { window?: unknown }).window

    let logSpy: MockInstance
    let warnSpy: MockInstance
    let errorSpy: MockInstance
    let debugSpy: MockInstance

    beforeEach(() => {
        delete (globalThis as { window?: unknown }).window
        logSpy = vi.spyOn(console, "log").mockImplementation(() => null)
        warnSpy = vi.spyOn(console, "warn").mockImplementation(() => null)
        errorSpy = vi.spyOn(console, "error").mockImplementation(() => null)
        debugSpy = vi.spyOn(console, "debug").mockImplementation(() => null)
    })

    afterEach(() => {
        vi.restoreAllMocks()

        if (originalWindow === undefined) delete (globalThis as { window?: unknown }).window
        else (globalThis as { window?: unknown }).window = originalWindow
    })

    describe("createNextLogger", () => {
        test("It should emit a success message with the success indicator and no prefix", ({ expect }) => {
            const logger = createNextLogger()
            logger.success("ok")

            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}ok`)
        })

        test("It should route warn/error/info/debug to the correct console methods", ({ expect }) => {
            const logger = createNextLogger()
            logger.warn("w")
            logger.error("e")
            logger.info("i")
            logger.debug("d")

            expect(warnSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.warning}w`)
            expect(errorSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.error}e`)
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.info}i`)
            expect(debugSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.debug}d`)
        })

        test("It should pad the default prefix to the configured prefixLength", ({ expect }) => {
            const logger = createNextLogger("api")
            logger.success("hello")

            // `[api]` is 5 chars, prefixLength defaults to 10 -> 5 trailing spaces
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[api]     hello`)
        })

        test("It should honor a custom prefixLength", ({ expect }) => {
            const logger = createNextLogger("api", 15)
            logger.success("hello")

            // `[api]` is 5 chars, prefixLength 15 -> 10 trailing spaces
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[api]          hello`)
        })

        test("It should allow per-call prefix override via options.prefix", ({ expect }) => {
            const logger = createNextLogger("api")
            logger.success("hello", { prefix: "db" })

            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[db]      hello`)
        })

        test("It should append indented data when options.data is provided", ({ expect }) => {
            const logger = createNextLogger()
            logger.info("payload", { data: { a: 1 } })

            const [first, second] = logSpy.mock.calls[0] as [string, string]
            expect(first).toBe(`${NEXT_LOG_INDICATORS.info}payload:`)
            expect(second).toContain('"a": 1')

            // The data block is prefixed with three spaces per line in Node
            expect(second.split("\n").every(line => line === "" || line.startsWith("   "))).toBe(true)
        })

        test("It should emit data even when the value is null", ({ expect }) => {
            const logger = createNextLogger()
            logger.info("payload", { data: null })

            expect((logSpy.mock.calls[0] as [string])[0]).toBe(`${NEXT_LOG_INDICATORS.info}payload:`)
        })

        test("It should omit ANSI indicators and skip prefix padding in browser environments", ({ expect }) => {
            ;(globalThis as { window?: unknown }).window = {}

            const logger = createNextLogger("api")
            logger.success("hello")

            expect(logSpy).toHaveBeenCalledWith("[api] hello")
        })
    })

    describe("withPrefix", () => {
        test("It should return a new logger that uses the given prefix as default", ({ expect }) => {
            const logger = createNextLogger("root").withPrefix("child")
            logger.success("hello")

            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[child]   hello`)
        })

        test("It should inherit the parent's prefixLength when none is provided", ({ expect }) => {
            const logger = createNextLogger("root", 15).withPrefix("child")
            logger.success("hello")

            // `[child]` is 7 chars, inherited prefixLength 15 -> 8 trailing spaces
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[child]        hello`)
        })

        test("It should honor an explicit prefixLength override", ({ expect }) => {
            const logger = createNextLogger("root").withPrefix("child", 20)
            logger.success("hello")

            // `[child]` is 7 chars, override prefixLength 20 -> 13 trailing spaces
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[child]             hello`)
        })

        test("It should not mutate the parent logger's default prefix", ({ expect }) => {
            const parent = createNextLogger("root")
            parent.withPrefix("child")
            parent.success("hello")

            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}[root]    hello`)
        })
    })

    describe("nextLogger (default instance)", () => {
        test("It should work without a default prefix", ({ expect }) => {
            nextLogger.success("hello")
            expect(logSpy).toHaveBeenCalledWith(`${NEXT_LOG_INDICATORS.success}hello`)
        })
    })

    describe("generateNextLoggerPrefix", () => {
        test("It should derive a 3-char suffix from the UUID's stripped hex", ({ expect }) => {
            expect(generateNextLoggerPrefix("a1b2c3d4-e5f6-7890-abcd-ef0123456789")).toBe("a1b")
        })

        test("It should prepend the label when one is provided", ({ expect }) => {
            expect(generateNextLoggerPrefix("a1b2c3d4-e5f6-7890-abcd-ef0123456789", "worker")).toBe("worker-a1b")
        })

        test("It should strip every dash from the UUID before slicing", ({ expect }) => {
            // First three chars after stripping all dashes are still "a1b"
            expect(generateNextLoggerPrefix("---a1b2c3---")).toBe("a1b")
        })
    })
})
