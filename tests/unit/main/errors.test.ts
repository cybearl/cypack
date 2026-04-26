import { describe, test } from "vitest"
import { BaseErrors, formatErrorResponse, formatMessageAsStringifiedError, parseCRUDError, stringifyError } from "@/main/errors"
import type { ErrorObj } from "@/main/types/requests"

describe("errors", () => {
    describe("formatErrorResponse", () => {
        test("It should return a failed response with the error and its message", ({ expect }) => {
            const error: ErrorObj = { status: 400, name: "BadRequest", message: "Bad request.", data: null }
            expect(formatErrorResponse(error)).toStrictEqual({
                success: false,
                message: "Bad request.",
                error,
            })
        })

        test("It should use the custom message when provided", ({ expect }) => {
            const error: ErrorObj = { status: 400, name: "BadRequest", message: "Bad request.", data: null }
            const result = formatErrorResponse(error, "Custom message")
            expect(result.message).toBe("Custom message")
        })

        test("It should attach additional data to the error when provided", ({ expect }) => {
            const error: ErrorObj = { status: 400, name: "BadRequest", message: "Bad request.", data: null }
            const result = formatErrorResponse(error, undefined, { detail: "extra" })
            expect(result.error.data).toStrictEqual({ detail: "extra" })
        })
    })

    describe("stringifyError", () => {
        test("It should serialize an ErrorObj to a JSON string", ({ expect }) => {
            const error: ErrorObj = { status: 400, name: "BadRequest", message: "Bad request.", data: null }
            const result = stringifyError({ ...error })
            expect(typeof result).toBe("string")
            expect(JSON.parse(result)).toStrictEqual(error)
        })

        test("It should replace the message if a custom one is provided", ({ expect }) => {
            const error: ErrorObj = { status: 400, name: "BadRequest", message: "Bad request.", data: null }
            const result = stringifyError({ ...error }, "Custom message")
            expect(JSON.parse(result).message).toBe("Custom message")
        })
    })

    describe("parseCRUDError", () => {
        test("It should return a failed request with a 500 CRUD_ERROR shape", ({ expect }) => {
            const result = parseCRUDError(new Error("db failure"))
            expect(result.success).toBe(false)
            expect(result.error.status).toBe(500)
            expect(result.error.name).toBe("CRUD_ERROR")
        })

        test("It should include the raw error string in the data field", ({ expect }) => {
            const result = parseCRUDError(new Error("db failure"))
            expect((result.error.data as { error: string }).error).toContain("db failure")
        })

        test("It should not throw if the value is not an Error instance", ({ expect }) => {
            expect(() => parseCRUDError("plain string error")).not.toThrow()
        })
    })

    describe("formatMessageAsStringifiedError", () => {
        test("It should return a JSON string containing the provided message", ({ expect }) => {
            const result = formatMessageAsStringifiedError("Something went wrong")
            expect(JSON.parse(result).message).toBe("Something went wrong")
        })

        test("It should include success set to false in the output", ({ expect }) => {
            const result = formatMessageAsStringifiedError("Error")
            expect(JSON.parse(result).success).toBe(false)
        })

        test("It should not contain raw line breaks in the output", ({ expect }) => {
            const result = formatMessageAsStringifiedError("Test")
            expect(result).not.toContain("\n")
        })
    })

    describe("BaseErrors", () => {
        test("It should contain a BAD_REQUEST entry with the correct shape", ({ expect }) => {
            expect(BaseErrors.BAD_REQUEST).toStrictEqual({
                status: 400,
                name: "BadRequest",
                message: "Bad request.",
                data: null,
            })
        })

        test("It should contain a NOT_FOUND entry with status 404", ({ expect }) => {
            expect(BaseErrors.NOT_FOUND.status).toBe(404)
        })

        test("It should contain an INTERNAL_SERVER_ERROR entry with status 500", ({ expect }) => {
            expect(BaseErrors.INTERNAL_SERVER_ERROR.status).toBe(500)
        })
    })
})