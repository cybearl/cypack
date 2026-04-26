import { describe, test } from "vitest"
import { shadeColor } from "@/main/styling"

describe("styling", () => {
    describe("shadeColor", () => {
        test("It should lighten a color by a positive percentage", ({ expect }) => {
            expect(shadeColor("#808080", 10)).toBe("#8d8d8d")
        })

        test("It should darken a color by a negative percentage", ({ expect }) => {
            expect(shadeColor("#808080", -10)).toBe("#737373")
        })

        test("It should return the same color if the percentage is zero", ({ expect }) => {
            expect(shadeColor("#808080", 0)).toBe("#808080")
        })

        test("It should clamp channels at 255 when lightening beyond the maximum", ({ expect }) => {
            expect(shadeColor("#ff0000", 50)).toBe("#ff0000")
        })

        test("It should return a valid 7-character hex color string", ({ expect }) => {
            const result = shadeColor("#aabbcc", 20)
            expect(result).toMatch(/^#[0-9a-f]{6}$/)
        })
    })
})