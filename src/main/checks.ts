/**
 * Returns true if the code is running in a client environment.
 */
export function isClient() {
    return !isServer()
}

/**
 * Returns true if the code is running in a server environment.
 */
export function isServer() {
    return typeof window === "undefined"
}

/**
 * Compares two arrays for equality.
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns True if the arrays are equal, false otherwise.
 */
export function arrayEqual(array1: Array<any>, array2: Array<any>): boolean {
    if (array1 === array2) return true

    const { length } = array1
    if (length !== array2.length) return false

    for (let index = 0; index < length; index++) {
        if (array1[index] !== array2[index]) return false
    }

    return true
}
