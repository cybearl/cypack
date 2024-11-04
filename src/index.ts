import useAnimationFrame from "@/react/hooks/useAnimationFrame"
import useCanvas from "@/react/hooks/useCanvas"
import useInterval from "@/react/hooks/useInterval"
import useMouseCoordinates from "@/react/hooks/useMouseCoordinates"

/**
 * Namespace for the AdonisJS framework.
 */
const adonis = {}

/**
 * Namespace for the Cybearl General API System (CGAS).
 */
const cgas = {}

/**
 * Namespace for React.
 */
const react = {
	useAnimationFrame,
	useCanvas,
	useInterval,
	useMouseCoordinates,
}

export { adonis, react }
