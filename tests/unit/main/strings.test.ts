import { describe, test } from "vitest"
import { convertErrorToString, decodeObjectURIComponents } from "@/main/strings"

describe("strings", () => {
    describe("convertErrorToString", () => {
        test("It should return a string value as-is", ({ expect }) => {
            expect(convertErrorToString("plain error")).toBe("plain error")
        })

        test("It should convert an Error instance to its string representation", ({ expect }) => {
            expect(convertErrorToString(new Error("oops"))).toBe("Error: oops")
        })

        test("It should stringify a serializable object", ({ expect }) => {
            expect(convertErrorToString({ code: 42 })).toBe('{"code":42}')
        })

        test("It should fall back to the template literal if the object serializes to empty braces", ({ expect }) => {
            const err = new Error("fallback")
            const result = convertErrorToString(err)
            expect(result).toContain("fallback")
        })
    })

    describe("decodeObjectURIComponents", () => {
        test("It should decode URI-encoded string values", ({ expect }) => {
            expect(decodeObjectURIComponents({ key: "hello%20world" })).toStrictEqual({ key: "hello world" })
        })

        test("It should decode multiple keys", ({ expect }) => {
            expect(decodeObjectURIComponents({ a: "foo%20bar", b: "baz%21" })).toStrictEqual({
                a: "foo bar",
                b: "baz!",
            })
        })

        test("It should leave already-decoded values unchanged", ({ expect }) => {
            expect(decodeObjectURIComponents({ key: "plain" })).toStrictEqual({ key: "plain" })
        })

        test("It should return an empty object unchanged", ({ expect }) => {
            expect(decodeObjectURIComponents({})).toStrictEqual({})
        })
    })
})