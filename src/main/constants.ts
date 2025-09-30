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
    MAX_NAME_LENGTH: 255,
    MAX_SLUG_LENGTH: 255,
    MIN_FIRST_NAME_LENGTH: 1,
    MAX_FIRST_NAME_LENGTH: 36,
    MIN_LAST_NAME_LENGTH: 1,
    MAX_LAST_NAME_LENGTH: 36,
    MAX_DESCRIPTION_LENGTH: 1024,
    MAX_URL_LENGTH: 2048,
    MAX_MIME_TYPE_LENGTH: 255,
    MAX_EXTERNAL_LINKS_COUNT: 6,
    USERNAME_REGEX: /^[a-zA-Z0-9_.-]+$/,
    SLUG_REGEX: /^[a-zA-Z0-9-]+$/,

    // Image & Video sizes
    IMG_SIZES_HIGH_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
    IMG_SIZES_MEDIUM_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw",
    IMG_SIZES_BASE_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    IMG_SIZES_LOW_QUALITY: "(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 25vw",
}

export default CyCONSTANTS
