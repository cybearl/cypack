import { randomBytes } from "node:crypto"
import { describe, test } from "vitest"
import { crypto } from "@/backend/crypto"

describe("crypto", () => {
    const key = randomBytes(32).toString("base64")
    const plaintext = "Hello, world!"

    describe("aes256Gcm.encrypt", () => {
        test("It should return an object with iv, ciphertext, tag, and payload", ({ expect }) => {
            const result = crypto.aes256Gcm.encrypt(key, plaintext)
            expect(typeof result.iv).toBe("string")
            expect(typeof result.ciphertext).toBe("string")
            expect(Buffer.isBuffer(result.tag)).toBe(true)
            expect(typeof result.payload).toBe("string")
        })

        test("It should produce a payload in the format iv.ciphertext.tag", ({ expect }) => {
            const result = crypto.aes256Gcm.encrypt(key, plaintext)
            expect(result.payload.split(".").length).toBe(3)
        })

        test("It should produce a different ciphertext on each call if the plaintext is the same", ({ expect }) => {
            const result1 = crypto.aes256Gcm.encrypt(key, plaintext)
            const result2 = crypto.aes256Gcm.encrypt(key, plaintext)
            expect(result1.ciphertext).not.toBe(result2.ciphertext)
        })

        test("It should throw if the key does not decode to 32 bytes", ({ expect }) => {
            expect(() => crypto.aes256Gcm.encrypt("short", plaintext)).toThrow()
        })
    })

    describe("aes256Gcm.decrypt", () => {
        test("It should decrypt ciphertext back to the original plaintext", ({ expect }) => {
            const { iv, ciphertext, tag } = crypto.aes256Gcm.encrypt(key, plaintext)
            expect(crypto.aes256Gcm.decrypt(key, iv, ciphertext, tag.toString("base64"))).toBe(plaintext)
        })

        test("It should return null when decrypting with a wrong key", ({ expect }) => {
            const { iv, ciphertext, tag } = crypto.aes256Gcm.encrypt(key, plaintext)
            const wrongKey = randomBytes(32).toString("base64")
            expect(crypto.aes256Gcm.decrypt(wrongKey, iv, ciphertext, tag.toString("base64"))).toBeNull()
        })
    })

    describe("aes256Gcm.decryptPayload", () => {
        test("It should decrypt a payload back to the original plaintext", ({ expect }) => {
            const { payload } = crypto.aes256Gcm.encrypt(key, plaintext)
            expect(crypto.aes256Gcm.decryptPayload(key, payload)).toBe(plaintext)
        })

        test("It should throw if the payload does not contain exactly two dots", ({ expect }) => {
            expect(() => crypto.aes256Gcm.decryptPayload(key, "invalid-payload")).toThrow()
        })
    })
})