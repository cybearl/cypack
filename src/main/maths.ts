/**
 * Map a number to a range of numbers.
 * @param value The number to map.
 * @param inMin The minimum value of the input range.
 * @param inMax The maximum value of the input range.
 * @param outMin The minimum value of the output range.
 * @param outMax The maximum value of the output range.
 * @param clamp Whether to clamp the output value to the output range (optional, defaults to true).
 * @returns The mapped number.
 */
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    clamp = true,
): number {
    const mappedValue = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

    if (clamp) return Math.min(Math.max(mappedValue, outMin), outMax)
    return mappedValue
}

/**
 * Safely creates an average value based on a total and count coming from
 * a Lucid ORM / SQL query result.
 * @param total The total value.
 * @param count The count value.
 * @param decimalPlaces The number of decimal places to round to (optional, defaults to 2).
 * @returns The calculated average, or 0 if the count is zero or invalid.
 */
export function safeAverage(total?: string | number, count?: string | number, decimalPlaces = 2): number {
    if (!count) return 0

    const parsedTotal = typeof total === "string" ? parseFloat(total) : total
    const parsedCount = typeof count === "string" ? parseFloat(count) : count

    return parseFloat(((parsedTotal || 0) / (parsedCount || 1)).toFixed(decimalPlaces))
}

/**
 * Safely creates a percentage based on a numerator and denominator coming from
 * a Lucid ORM / SQL query result.
 *
 * Note: If the denominator is zero, this function will return `-1` if the
 * numerator is greater than zero, showing it as a growth from nothing to something.
 * @param numerator The numerator value.
 * @param denominator The denominator value.
 * @param decimalPlaces The number of decimal places to round to (optional, defaults to 2).
 * @returns The calculated percentage, or 0 if the denominator is zero or invalid.
 */
export function safePercentage(numerator?: string | number, denominator?: string | number, decimalPlaces = 2): number {
    if (!denominator) return 0

    const parsedNumerator = typeof numerator === "string" ? parseFloat(numerator) : numerator
    const parsedDenominator = typeof denominator === "string" ? parseFloat(denominator) : denominator

    // -1 means growth from nothing to something
    if (!parsedDenominator) return parsedNumerator && parsedNumerator > 0 ? -1 : 0

    return parseFloat(
        ((((parsedNumerator || 0) - (parsedDenominator || 0)) / (parsedDenominator || 1)) * 100).toFixed(decimalPlaces),
    )
}
