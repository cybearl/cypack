import { describe, test } from "vitest"
import {
    formatBytes,
    formatHRTime,
    formatPercentage,
    formatTime,
    formatUnit,
    isValidIntId,
    isValidSlug,
    parseQueryNumberArray,
    parseQueryStringArray,
    slugifyName,
    truncateString,
} from "@/main/formats"

describe("formats", () => {
    describe("isValidIntId", () => {
        test("It should return true if the ID is a valid positive integer", ({ expect }) => {
            expect(isValidIntId("1")).toBe(true)
        })

        test("It should return true if the ID is zero", ({ expect }) => {
            expect(isValidIntId("0")).toBe(true)
        })

        test("It should return false if the ID is negative", ({ expect }) => {
            expect(isValidIntId("-1")).toBe(false)
        })

        test("It should return false if the ID is a float", ({ expect }) => {
            expect(isValidIntId("1.5")).toBe(false)
        })

        test("It should return false if the ID is non-numeric", ({ expect }) => {
            expect(isValidIntId("abc")).toBe(false)
        })

        test("It should return false if the string is empty", ({ expect }) => {
            expect(isValidIntId("")).toBe(false)
        })
    })

    describe("isValidSlug", () => {
        test("It should return true if the slug contains only valid characters", ({ expect }) => {
            expect(isValidSlug("valid-slug-123")).toBe(true)
        })

        test("It should return true if the slug contains uppercase letters", ({ expect }) => {
            expect(isValidSlug("Valid-Slug")).toBe(true)
        })

        test("It should return false if the slug contains spaces", ({ expect }) => {
            expect(isValidSlug("invalid slug")).toBe(false)
        })

        test("It should return false if the slug contains special characters", ({ expect }) => {
            expect(isValidSlug("invalid!slug")).toBe(false)
        })

        test("It should return false if the slug is empty", ({ expect }) => {
            expect(isValidSlug("")).toBe(false)
        })
    })

    describe("formatUnit", () => {
        test("It should format a small number with the default unit and time unit", ({ expect }) => {
            expect(formatUnit(100).trim()).toBe("100.00 Op/s")
        })

        test("It should use the kilo prefix if the number is >= 1,000", ({ expect }) => {
            expect(formatUnit(1_000).trim()).toBe("1.00 kOp/s")
        })

        test("It should use the mega prefix if the number is >= 1,000,000", ({ expect }) => {
            expect(formatUnit(1_000_000).trim()).toBe("1.00 MOp/s")
        })

        test("It should use a custom unit without a time unit", ({ expect }) => {
            expect(formatUnit(100, "px", null).trim()).toBe("100.00 px")
        })

        test("It should omit the unit if both unit and time unit are null", ({ expect }) => {
            expect(formatUnit(100, null, null).trim()).toBe("100.00")
        })
    })

    describe("formatHRTime", () => {
        test("It should format a value in nanoseconds", ({ expect }) => {
            expect(formatHRTime(500n).trim()).toBe("500.00ns")
        })

        test("It should format a value in microseconds", ({ expect }) => {
            expect(formatHRTime(1_000n).trim()).toBe("1.00µs")
        })

        test("It should format a value in milliseconds", ({ expect }) => {
            expect(formatHRTime(1_000_000n).trim()).toBe("1.00ms")
        })

        test("It should format a value in seconds", ({ expect }) => {
            expect(formatHRTime(1_000_000_000n).trim()).toBe("1.00s")
        })

        test("It should format a value in minutes", ({ expect }) => {
            expect(formatHRTime(60_000_000_000n).trim()).toBe("1.00m")
        })

        test("It should format a value in hours", ({ expect }) => {
            expect(formatHRTime(3_600_000_000_000_000n).trim()).toBe("1.00h")
        })
    })

    describe("formatTime", () => {
        test("It should format a value in milliseconds", ({ expect }) => {
            expect(formatTime(500).trim()).toBe("500.00ms")
        })

        test("It should format a value in seconds", ({ expect }) => {
            expect(formatTime(1_000).trim()).toBe("1.00s")
        })

        test("It should format a value in minutes", ({ expect }) => {
            expect(formatTime(60_000).trim()).toBe("1.00m")
        })

        test("It should format a value in hours", ({ expect }) => {
            expect(formatTime(3_600_000).trim()).toBe("1.00h")
        })
    })

    describe("formatPercentage", () => {
        test("It should format a percentage with two decimal places", ({ expect }) => {
            expect(formatPercentage(50).trim()).toBe("50.00%")
        })

        test("It should format zero percent", ({ expect }) => {
            expect(formatPercentage(0).trim()).toBe("0.00%")
        })

        test("It should format 100 percent", ({ expect }) => {
            expect(formatPercentage(100).trim()).toBe("100.00%")
        })
    })

    describe("truncateString", () => {
        test("It should return the string unchanged if it is shorter than the limit", ({ expect }) => {
            expect(truncateString("hello", 10)).toBe("hello")
        })

        test("It should return the string unchanged if it is exactly at the limit", ({ expect }) => {
            expect(truncateString("hello", 5)).toBe("hello")
        })

        test("It should truncate and append '...' if the string exceeds the limit", ({ expect }) => {
            expect(truncateString("hello world", 5)).toBe("hello...")
        })
    })

    describe("parseQueryNumberArray", () => {
        test("It should parse a comma-separated number string into an array", ({ expect }) => {
            expect(parseQueryNumberArray("1,2,3")).toStrictEqual([1, 2, 3])
        })

        test("It should filter out non-numeric entries", ({ expect }) => {
            expect(parseQueryNumberArray("1,abc,3")).toStrictEqual([1, 3])
        })

        test("It should accept an array of strings as input", ({ expect }) => {
            expect(parseQueryNumberArray(["1", "2", "3"])).toStrictEqual([1, 2, 3])
        })

        test("It should return an empty array if the input string is empty", ({ expect }) => {
            expect(parseQueryNumberArray("")).toStrictEqual([])
        })
    })

    describe("parseQueryStringArray", () => {
        test("It should parse a comma-separated string into an array", ({ expect }) => {
            expect(parseQueryStringArray("a,b,c")).toStrictEqual(["a", "b", "c"])
        })

        test("It should trim whitespace from each entry", ({ expect }) => {
            expect(parseQueryStringArray("a , b , c")).toStrictEqual(["a", "b", "c"])
        })

        test("It should accept an array of strings as input", ({ expect }) => {
            expect(parseQueryStringArray(["a", "b", "c"])).toStrictEqual(["a", "b", "c"])
        })

        test("It should return an empty array if the input string is empty", ({ expect }) => {
            expect(parseQueryStringArray("")).toStrictEqual([])
        })
    })

    describe("slugifyName", () => {
        test("It should convert a name to a lowercase slug", ({ expect }) => {
            expect(slugifyName("Hello World")).toBe("hello-world")
        })

        test("It should strip special characters from the name", ({ expect }) => {
            expect(slugifyName("Hello, World!")).toBe("hello-world")
        })

        test("It should increment a trailing numeric suffix from the previous slug", ({ expect }) => {
            expect(slugifyName("Hello World", "hello-world-1")).toBe("hello-world-2")
        })

        test("It should slugify the name if the previous slug has no trailing number", ({ expect }) => {
            expect(slugifyName("Hello World", "hello-world")).toBe("hello-world")
        })
    })

    describe("formatBytes", () => {
        test("It should return '0 Bytes' if the value is zero", ({ expect }) => {
            expect(formatBytes(0)).toBe("0 Bytes")
        })

        test("It should format values below 1 KB in bytes", ({ expect }) => {
            expect(formatBytes(512)).toBe("512 Bytes")
        })

        test("It should format exactly 1 KB", ({ expect }) => {
            expect(formatBytes(1024)).toBe("1 KB")
        })

        test("It should format exactly 1 MB", ({ expect }) => {
            expect(formatBytes(1024 * 1024)).toBe("1 MB")
        })

        test("It should format exactly 1 GB", ({ expect }) => {
            expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB")
        })

        test("It should respect the specified number of decimal places", ({ expect }) => {
            expect(formatBytes(1536, 1)).toBe("1.5 KB")
        })
    })
})