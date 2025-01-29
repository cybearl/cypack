/**
 * A set of general constants.
 */
const CONSTANTS = {
	/**
	 * The minimum length of a username.
	 */
	MIN_USERNAME_LENGTH: 4,
	/**
	 * The maximum length of a username.
	 */
	MAX_USERNAME_LENGTH: 48,
	/**
	 * The minimum length of a password.
	 */
	MIN_PASSWORD_LENGTH: 8,
	/**
	 * The maximum length of a password.
	 */
	MAX_PASSWORD_LENGTH: 255,
	/**
	 * The maximum length of the name column for all tables.
	 */
	MAX_NAME_LENGTH: 128,
	/**
	 * The regex pattern for a valid name.
	 */
	NAME_PATTERN: /^[a-z0-9_-]+$/,
	/**
	 * The maximum length of the description column for all tables.
	 */
	MAX_DESCRIPTION_LENGTH: 2048,
}

export default CONSTANTS
