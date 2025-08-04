import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"

/**
 * The return type of the `encrypt` function.
 * - `iv`: Base64-encoded initialization vector used for encryption (no need to store it securely).
 * - `ciphertext`: Base64-encoded ciphertext resulting from the encryption process.
 * - `tag`: Authentication tag as a Buffer, used for verifying the integrity of the ciphertext.
 * - `payload`: Full payload combining iv, ciphertext, and tag, formatted as "iv.ciphertext.tag".
 */
export type CryptoAes256GcmEncryptResult = {
	iv: string
	ciphertext: string
	tag: Buffer
	payload: string
}

/**
 * Encrypts data using AES-256-GCM symmetric encryption.
 * @param key The base64-encoded key to use for encryption. Must be 32 bytes when decoded.
 * @param data The plaintext data to encrypt.
 * @returns An object containing the initialization vector (iv), ciphertext, and authentication tag.
 * @throws If any error occurs during encryption.
 */
function aes256GcmEncrypt(key: string, data: string): CryptoAes256GcmEncryptResult {
	const keyBuffer = Buffer.from(key, "base64")
	if (keyBuffer.length !== 32) {
		throw new Error(`Invalid key length: expected 32 bytes, got ${keyBuffer.length}`)
	}

	const iv = randomBytes(12).toString("base64")
	const cipher = createCipheriv("aes-256-gcm", keyBuffer, Buffer.from(iv, "base64"))

	let ciphertext = cipher.update(data, "utf8", "base64")
	ciphertext += cipher.final("base64")
	const tag = cipher.getAuthTag()

	const payload = `${iv}.${ciphertext}.${tag.toString("base64")}`
	return { iv, ciphertext, tag, payload }
}

/**
 * Decrypts data using AES-256-GCM symmetric encryption.
 * @param key The base64-encoded key to use for decryption. Must be 32 bytes when decoded.
 * @param iv The base64-encoded initialization vector used during encryption.
 * @param ciphertext The base64-encoded ciphertext to decrypt.
 * @param tag The base64-encoded authentication tag used during encryption.
 * @returns The decrypted plaintext data or null if decryption fails.
 */
function aes256GcmDecrypt(key: string, iv: string, ciphertext: string, tag: string) {
	try {
		const decipher = createDecipheriv("aes-256-gcm", Buffer.from(key, "base64"), Buffer.from(iv, "base64"))
		decipher.setAuthTag(Buffer.from(tag, "base64"))

		let plaintext = decipher.update(ciphertext, "base64", "utf8")
		plaintext += decipher.final("utf8")

		return plaintext
	} catch (_) {
		// No information is provided about the error to avoid leaking sensitive data
		return null
	}
}

/**
 * Decrypts a payload that contains the initialization vector, ciphertext, and authentication tag.
 * @param key The base64-encoded key to use for decryption. Must be 32 bytes when decoded.
 * @param payload The payload string containing iv, ciphertext, and tag separated by dots.
 * @returns The decrypted plaintext data or null if decryption fails.
 */
function aes256GcmDecryptPayload(key: string, payload: string) {
	const parts = payload.split(".")
	if (parts.length !== 3) {
		throw new Error("Invalid payload format")
	}

	const [iv, ciphertext, tag] = parts
	return aes256GcmDecrypt(key, iv, ciphertext, tag)
}

/**
 * Contains utility functions for encryption and decryption.
 */
export const crypto = {
	aes256Gcm: {
		encrypt: aes256GcmEncrypt,
		decrypt: aes256GcmDecrypt,
		decryptPayload: aes256GcmDecryptPayload,
	},
}
