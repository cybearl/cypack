import { describe, test } from "vitest"
import { getHostname } from "@/backend/host"

describe("host", () => {
    describe("getHostname", () => {
        test("It should return a non-empty string", ({ expect }) => {
            const result = getHostname()
            expect(typeof result).toBe("string")
            expect((result as string).length).toBeGreaterThan(0)
        })
    })
})