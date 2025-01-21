import { assertServer, isServer } from "@/main/checks"
import * as constants from "@/main/constants"

import { formatHRTime, formatPercentage, formatTime, formatUnit, truncateString } from "@/main/formats"

import { stringify } from "@/main/json"
import { mapRange } from "@/main/maths"
import useAnimationFrame from "@/main/react/hooks/useAnimationFrame"
import useCanvas from "@/main/react/hooks/useCanvas"
import useInterval from "@/main/react/hooks/useInterval"
import useMouseCoordinates from "@/main/react/hooks/useMouseCoordinates"
import { shadeColor } from "@/main/styling"
import { addParamsToUrl, currentUrlOrigin } from "@/main/urls"

export {
	// Checks
	isServer,
	assertServer,
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
