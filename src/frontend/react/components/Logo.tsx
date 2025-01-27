import Image from "next/image"
import { useMemo } from "react"

/**
 * The props for the logo component.
 */
type LogoProps = {
	source: string

	className?: string
	width?: number
	height?: number
	fill?: boolean
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
	quality?: "xs" | "sm" | "md" | "lg" | "full" | string
	blur?: "none" | "xs" | "sm" | "md" | "lg" | string
}

/**
 * The logo component.
 */
export default function Logo({
	source,

	className,
	width,
	height,
	fill = true,
	objectFit = "cover",
	quality,
	blur = "none",
}: LogoProps) {
	const imgQuality = useMemo(() => {
		switch (quality) {
			case "xs":
				return "32px"
			case "sm":
				return "256px"
			case "md":
				return "1024px"
			case "lg":
				return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			case "full":
				return "100vw"
			default:
				return quality
		}
	}, [])

	const imgBlur = useMemo(() => {
		switch (blur) {
			case "xs":
				return "16px"
			case "sm":
				return "32px"
			case "md":
				return "45px"
			case "lg":
				return "64px"
			default:
				return blur
		}
	}, [])

	return (
		<Image
			src={source}
			alt={`logo${quality ? `-${quality}` : ""}`}
			width={width}
			height={height}
			fill={(width === undefined && height === undefined) || fill}
			objectFit={objectFit}
			className={className}
			sizes={imgQuality}
			style={{ filter: `blur(${imgBlur})` }}
		/>
	)
}
