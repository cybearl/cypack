import { describe, test } from "vitest"
import { arrayEqual, isClient, isServer } from "@/main/checks"

describe("checks", () => {
    describe("isServer", () => {
        test("It should return true in a Node.js environment", ({ expect }) => {
            expect(isServer()).toBe(true)
        })
    })

    describe("isClient", () => {
        test("It should return false in a Node.js environment", ({ expect }) => {
            expect(isClient()).toBe(false)
        })
    })

    describe("arrayEqual", () => {
        test("It should return true if both arrays are equal", ({ expect }) => {
            expect(arrayEqual([1, 2, 3], [1, 2, 3])).toBe(true)
        })

        test("It should return true if both arrays are empty", ({ expect }) => {
            expect(arrayEqual([], [])).toBe(true)
        })

        test("It should return true if both references point to the same array", ({ expect }) => {
            const arr = [1, 2, 3]
            expect(arrayEqual(arr, arr)).toBe(true)
        })

        test("It should return false if the arrays have different lengths", ({ expect }) => {
            expect(arrayEqual([1, 2, 3], [1, 2])).toBe(false)
        })

        test("It should return false if the arrays have different values", ({ expect }) => {
            expect(arrayEqual([1, 2, 3], [1, 2, 4])).toBe(false)
        })

        test("It should return false if the arrays contain nested arrays with the same values", ({ expect }) => {
            expect(arrayEqual([[1]], [[1]])).toBe(false)
        })
    })
})