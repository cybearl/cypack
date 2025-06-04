/**
 * A set of general constants.
 */
const CyCONSTANTS = {
	// Security
	HASH_SALT_ROUNDS: 12,

	// User
	MIN_USERNAME_LENGTH: 4,
	MAX_USERNAME_LENGTH: 36,
	MIN_PASSWORD_LENGTH: 8,
	MAX_PASSWORD_LENGTH: 255,
	MAX_NAME_LENGTH: 128,
	MIN_FIRST_NAME_LENGTH: 1,
	MAX_FIRST_NAME_LENGTH: 64,
	MIN_LAST_NAME_LENGTH: 1,
	MAX_LAST_NAME_LENGTH: 64,
	MAX_DESCRIPTION_LENGTH: 2048,
	MAX_KEYWORD_LENGTH: 32,
	MAX_KEYWORDS_COUNT: 8,
	MAX_EXTERNAL_LINKS_COUNT: 6,
	USERNAME_REGEX: /^[a-zA-Z0-9_.-]+$/,

	// Image & Video sizes
	IMG_SIZES_HIGH_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
	IMG_SIZES_MEDIUM_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw",
	IMG_SIZES_BASE_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
	IMG_SIZES_LOW_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 25vw",
}

export default CyCONSTANTS
