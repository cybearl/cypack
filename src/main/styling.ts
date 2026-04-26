/**
 * Returns the inverse of a hex color string (e.g., "#aabbcc" -> "#554433").
 * @param hexColor The hex color string to invert.
 * @returns The inverted hex color string, or the original if the format is invalid.
 */
export function invertHexColor(hexColor: string): string {
    const strippedHex = hexColor.replace(/^#/, "")
    if (strippedHex.length !== 6) return hexColor

    const r = (255 - parseInt(strippedHex.slice(0, 2), 16)).toString(16).padStart(2, "0")
    const g = (255 - parseInt(strippedHex.slice(2, 4), 16)).toString(16).padStart(2, "0")
    const b = (255 - parseInt(strippedHex.slice(4, 6), 16)).toString(16).padStart(2, "0")

    return `#${r}${g}${b}`
}

/**
 * Applies an opacity factor to a hex color, returning a 4-channel hex string.
 * @param hexColor The hex color string to modify.
 * @param opacity The opacity factor (0–1) to apply.
 * @returns The 8-character hex color string with applied opacity, or the original if the format is invalid.
 */
export function applyHexColorOpacity(hexColor: string, opacity: number): string {
    const clampedOpacity = Math.min(Math.max(opacity, 0), 1)
    const strippedHex = hexColor.replace(/^#/, "")
    if (strippedHex.length !== 6) return hexColor

    const alpha = Math.round(clampedOpacity * 255)
        .toString(16)
        .padStart(2, "0")

    return `#${strippedHex}${alpha}`
}

/**
 * Shades a color by a percentage.
 * @param color The color to shade.
 * @param percent The percentage to shade by.
 * @returns The shaded color.
 */
export function shadeColor(color: string, percent: number) {
    let R = Number.parseInt(color.substring(1, 3), 16)
    let G = Number.parseInt(color.substring(3, 5), 16)
    let B = Number.parseInt(color.substring(5, 7), 16)

    R = Math.round((R * (100 + percent)) / 100)
    G = Math.round((G * (100 + percent)) / 100)
    B = Math.round((B * (100 + percent)) / 100)

    R = R < 255 ? R : 255
    G = G < 255 ? G : 255
    B = B < 255 ? B : 255

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    const RR = R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16)
    const GG = G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16)
    const BB = B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16)

    return `#${RR}${GG}${BB}`
}
