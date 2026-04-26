import { describe, test } from "vitest"
import { formatJson, stringify } from "@/main/json"

describe("json", () => {
    describe("formatJson", () => {
        test("It should format a compact JSON string with 4-space indentation", ({ expect }) => {
            expect(formatJson('{"a":1}')).toBe('{\n    "a": 1\n}')
        })

        test("It should format a nested JSON string", ({ expect }) => {
            expect(formatJson('{"a":{"b":2}}')).toBe('{\n    "a": {\n        "b": 2\n    }\n}')
        })

        test("It should round-trip already-formatted JSON", ({ expect }) => {
            const input = '{"a":1,"b":2}'
            expect(formatJson(input)).toBe(formatJson(formatJson(input)))
        })
    })

    describe("stringify", () => {
        test("It should stringify a plain object with 4-space indentation", ({ expect }) => {
            expect(stringify({ a: 1 })).toBe('{\n    "a": 1\n}')
        })

        test("It should serialize BigInt values as strings", ({ expect }) => {
            expect(stringify({ n: BigInt(42) })).toBe('{\n    "n": "42"\n}')
        })

        test("It should serialize function values as their source string", ({ expect }) => {
            const result = stringify({ fn: () => 1 })
            expect(result).toContain('"fn"')
            expect(result).toContain("() => 1")
        })

        test("It should use the specified indentation level", ({ expect }) => {
            expect(stringify({ a: 1 }, 2)).toBe('{\n  "a": 1\n}')
        })
    })
})