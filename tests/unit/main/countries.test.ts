import { describe, test } from "vitest"
import { COUNTRIES_SELECT_FIELD, formatCountryName, getCountryNameFromCode } from "@/main/countries"

describe("countries", () => {
    describe("formatCountryName", () => {
        test("It should return a single-word country name unchanged", ({ expect }) => {
            expect(formatCountryName("France")).toBe("France")
        })

        test("It should insert a space before each uppercase letter in a camel-case name", ({ expect }) => {
            expect(formatCountryName("UnitedKingdom")).toBe("United Kingdom")
        })

        test("It should handle the CoteDIvoire special case", ({ expect }) => {
            expect(formatCountryName("CoteDIvoire")).toBe("Cote D'Ivoire")
        })

        test("It should handle the VirginIslandsUS special case", ({ expect }) => {
            expect(formatCountryName("VirginIslandsUS")).toBe("Virgin Islands US")
        })
    })

    describe("getCountryNameFromCode", () => {
        test("It should return the country name if the ISO code is valid", ({ expect }) => {
            expect(getCountryNameFromCode("FR")).toBe("France")
        })

        test("It should return the formatted name if the country name has multiple words", ({ expect }) => {
            expect(getCountryNameFromCode("GB")).toBe("United Kingdom")
        })

        test("It should return undefined if the code is not in the registry", ({ expect }) => {
            expect(getCountryNameFromCode("XX")).toBeUndefined()
        })
    })

    describe("COUNTRIES_SELECT_FIELD", () => {
        test("It should be a non-empty array", ({ expect }) => {
            expect(Array.isArray(COUNTRIES_SELECT_FIELD)).toBe(true)
            expect(COUNTRIES_SELECT_FIELD.length).toBe(249)
        })

        test("It should contain entries with a string label and a string value", ({ expect }) => {
            for (const entry of COUNTRIES_SELECT_FIELD) {
                expect(typeof entry.label).toBe("string")
                expect(typeof entry.value).toBe("string")
            }
        })

        test("It should contain the correct entry for France", ({ expect }) => {
            const france = COUNTRIES_SELECT_FIELD.find(e => e.value === "FR")
            expect(france).toStrictEqual({ label: "France", value: "FR" })
        })
    })
})