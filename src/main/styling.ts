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
