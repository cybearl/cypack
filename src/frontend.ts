import * as constants from "@/general/constants"

import { formatHRTime, formatPercentage, formatTime, formatUnit, truncateString } from "@/general/formats"

import { stringify } from "@/general/json"
import { mapRange } from "@/general/maths"
import { shadeColor } from "@/general/styling"
import { addParamsToUrl, currentUrlOrigin } from "@/general/urls"
import useAnimationFrame from "@/react/hooks/useAnimationFrame"
import useCanvas from "@/react/hooks/useCanvas"
import useInterval from "@/react/hooks/useInterval"
import useMouseCoordinates from "@/react/hooks/useMouseCoordinates"

export {
	// Configurations
	constants,
	// Formats
	formatUnit,
	formatHRTime,
	formatTime,
	formatPercentage,
	truncateString,
	// JSON
	stringify,
	// Maths
	mapRange,
	// Styling
	shadeColor,
	// URLs
	addParamsToUrl,
	currentUrlOrigin,
	// React hooks
	useAnimationFrame,
	useCanvas,
	useInterval,
	useMouseCoordinates,
}
