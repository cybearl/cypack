import { getCGASStatus } from "@/frontend/cgas/status"
import useAnimationFrame from "@/frontend/react/hooks/useAnimationFrame"
import useCanvas from "@/frontend/react/hooks/useCanvas"
import useInterval from "@/frontend/react/hooks/useInterval"
import useMouseCoordinates from "@/frontend/react/hooks/useMouseCoordinates"
import { addParamsToUrl, currentUrlOrigin } from "@/frontend/urls"

export {
	// CGAS
	getCGASStatus,
	// URLs
	addParamsToUrl,
	currentUrlOrigin,
	// React hooks
	useAnimationFrame,
	useCanvas,
	useInterval,
	useMouseCoordinates,
}
