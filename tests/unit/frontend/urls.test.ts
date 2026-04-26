import { describe, test } from "vitest"
import { addParamsToUrl } from "@/frontend/urls"

describe("urls", () => {
    describe("addParamsToUrl", () => {
        test("It should append a query parameter to a URL with no existing params", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", { a: "1" })).toBe("https://example.com?a=1")
        })

        test("It should append a parameter using '&' when the URL already has a query string", ({ expect }) => {
            expect(addParamsToUrl("https://example.com?existing=x", { a: "1" })).toBe(
                "https://example.com?existing=x&a=1",
            )
        })

        test("It should return the URL unchanged when the params object is empty", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", {})).toBe("https://example.com")
        })

        test("It should URI-encode parameter values that contain special characters", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", { q: "hello world" })).toBe(
                "https://example.com?q=hello%20world",
            )
        })

        test("It should skip undefined, null, and empty string values", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", { a: undefined, b: null, c: "" })).toBe(
                "https://example.com",
            )
        })

        test("It should skip the string values 'null' and 'undefined'", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", { a: "null", b: "undefined" })).toBe(
                "https://example.com",
            )
        })

        test("It should accept numeric and boolean parameter values", ({ expect }) => {
            expect(addParamsToUrl("https://example.com", { n: 42, flag: true })).toBe(
                "https://example.com?n=42&flag=true",
            )
        })
    })
})