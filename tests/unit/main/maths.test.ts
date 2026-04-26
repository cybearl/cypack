import { describe, test } from "vitest"
import { mapRange, safeAverage, safePercentage } from "@/main/maths"

describe("maths", () => {
    describe("mapRange", () => {
        test("It should map a value from one range to another", ({ expect }) => {
            expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
        })

        test("It should map the minimum input value to the minimum output value", ({ expect }) => {
            expect(mapRange(0, 0, 10, 0, 100)).toBe(0)
        })

        test("It should map the maximum input value to the maximum output value", ({ expect }) => {
            expect(mapRange(10, 0, 10, 0, 100)).toBe(100)
        })

        test("It should clamp the output to the output range when clamping is enabled", ({ expect }) => {
            expect(mapRange(15, 0, 10, 0, 100)).toBe(100)
        })

        test("It should not clamp the output when clamping is disabled", ({ expect }) => {
            expect(mapRange(15, 0, 10, 0, 100, false)).toBe(150)
        })
    })

    describe("safeAverage", () => {
        test("It should return the average of total divided by count", ({ expect }) => {
            expect(safeAverage(10, 2)).toBe(5)
        })

        test("It should return 0 if the count is zero", ({ expect }) => {
            expect(safeAverage(10, 0)).toBe(0)
        })

        test("It should return 0 if the count is undefined", ({ expect }) => {
            expect(safeAverage(10, undefined)).toBe(0)
        })

        test("It should return 0 if both total and count are undefined", ({ expect }) => {
            expect(safeAverage(undefined, undefined)).toBe(0)
        })

        test("It should accept string values and parse them as floats", ({ expect }) => {
            expect(safeAverage("10", "2")).toBe(5)
        })

        test("It should round to the specified number of decimal places", ({ expect }) => {
            expect(safeAverage(10, 3, 4)).toBe(3.3333)
        })
    })

    describe("safePercentage", () => {
        test("It should return the percentage change from denominator to numerator", ({ expect }) => {
            expect(safePercentage(150, 100)).toBe(50)
        })

        test("It should return 0 if the denominator is zero", ({ expect }) => {
            expect(safePercentage(10, 0)).toBe(0)
        })

        test("It should return 0 if the denominator is undefined", ({ expect }) => {
            expect(safePercentage(10, undefined)).toBe(0)
        })

        test("It should return -1 when the string denominator parses to zero but the numerator is positive", ({ expect }) => {
            expect(safePercentage(10, "0")).toBe(-1)
        })

        test("It should return a negative percentage when the numerator is less than the denominator", ({ expect }) => {
            expect(safePercentage(50, 100)).toBe(-50)
        })

        test("It should accept string values and parse them as floats", ({ expect }) => {
            expect(safePercentage("150", "100")).toBe(50)
        })
    })
})