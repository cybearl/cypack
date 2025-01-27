import Image from "next/image"

/**
 * The props for the Cybearl logo component.
 */
type CybearlLogoProps = {
	className?: string

	width?: number
	height?: number
	fill?: boolean
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
	quality?: "xs" | "sm" | "md" | "lg" | "full" | string
	blur?: "none" | "xs" | "sm" | "md" | "lg" | string
}

/**
 * The official animated Cybearl logo.
 */
export default function CybearlAnimatedLogo({
	className,

	width,
	height,
	fill = true,
	objectFit = "cover",
	quality,
	blur = "none",
}: CybearlLogoProps) {
	const getAlt = () => `logo${quality ? `-${quality}` : ""}`

	const getQuality = () => {
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
	}

	const getBlur = () => {
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
	}

	return (
		<Image
			src="/assets/images/cybearl_logo.webp"
			alt={getAlt()}
			width={width}
			height={height}
			fill={(width === undefined && height === undefined) || fill}
			objectFit={objectFit}
			className={className}
			sizes={getQuality()}
			style={{ filter: `blur(${getBlur()})` }}
		/>
	)
}
