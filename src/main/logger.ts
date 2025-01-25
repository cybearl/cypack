import { stringify } from "@/main/json"
import type { Color, Colorette } from "colorette"
import dateFormat, { masks } from "dateformat"
import pino, { type LogDescriptor } from "pino"
import pretty from "pino-pretty"

/**
 * The type of the parameters object.
 */
type Parameters = {
	level: pino.LevelWithSilentOrString
	showLevel: boolean
	showTimestamp: boolean
	foreignObjectStartAtNewLine: boolean
	foreignObjectPadding: number | "after-timestamp" | "after-level"
	foreignObjectIndent: number
}

/**
 * The default parameters for the logger instance.
 */
const defaultParameters: Parameters = {
	level: process.env.LOG_LEVEL || "trace",
	showLevel: true,
	showTimestamp: true,
	foreignObjectStartAtNewLine: false,
	foreignObjectPadding: 0,
	foreignObjectIndent: 4,
}

/**
 * Temporary parameters for the current logger instance.
 */
const parameters: Parameters = { ...defaultParameters }

/**
 * Modify the format of the message depending on the log level.
 * @param log The log descriptor.
 * @returns The formatted message.
 */
function formatMessage(log: LogDescriptor, colors: Colorette): string {
	const native = {
		level: log.level,
		time: log.time,
		pid: log.pid,
		hostname: log.hostname,
		msg: log.msg,
	}

	// Generate an object with foreign keys and their values
	const foreign = Object.entries(log).reduce((acc: { [key: string]: unknown }, [key, value]) => {
		if (!Object.keys(native).includes(key)) acc[key] = value
		return acc
	}, {})

	let strLevel = "N/A"
	let effect: Color | undefined
	let color: Color

	switch (log.level as number | string) {
		case 10:
		case "trace":
			strLevel = "TRACE"
			color = colors.black
			break
		case 20:
		case "debug":
			strLevel = "DEBUG"
			color = colors.blue
			break
		case 30:
		case "info":
			strLevel = "INFO"
			color = colors.green
			break
		case 40:
		case "warn":
			strLevel = "WARN"
			color = colors.yellow
			break
		case 50:
		case "error":
			strLevel = "ERROR"
			color = colors.redBright
			break
		case 60:
		case "fatal":
			strLevel = "FATAL"
			effect = colors.bold
			color = colors.redBright
			break
		default:
			strLevel = "N/A"
			color = colors.white
			break
	}

	let formattedDate = ""
	if (parameters.showTimestamp) formattedDate = `[${dateFormat(new Date(log.time), masks.isoDateTime)}] `

	let formattedLevel = ""
	if (parameters.showLevel) formattedLevel = `[${strLevel}] `.padEnd(8, " ")

	let formattedForeign = ""
	if (Object.keys(foreign).length > 0) {
		if (parameters.foreignObjectPadding === "after-timestamp") {
			parameters.foreignObjectPadding = formattedDate.length
		} else if (parameters.foreignObjectPadding === "after-level") {
			parameters.foreignObjectPadding = formattedDate.length + formattedLevel.length
		}

		formattedForeign =
			`${parameters.foreignObjectStartAtNewLine ? "\n" : " "}${stringify(foreign, parameters.foreignObjectIndent)}`
				.split("\n")
				.map((line, index) => {
					if (index === 0) return line
					return line.padStart(line.length + (parameters.foreignObjectPadding as number), " ")
				})
				.join("\n")
	}

	const finalLog = color(`${formattedDate}${formattedLevel}${log.msg}${formattedForeign}`)
	if (effect) return effect(finalLog)
	return finalLog
}

/**
 * The pretty logger stream, note that no keys are included by defaults, everything goes through
 * the message format function via the `log` object.
 */
const stream = pretty({
	crlf: false,
	colorize: true,
	include: "",
	messageFormat: (log, _, __, { colors }) => formatMessage(log, colors),
})

/**
 * A custom logger instance compatible with both front and back-end, allowing to log messages
 * with different levels and colors.
 *
 * The available levels are:
 * - `fatal`
 * - `error`
 * - `warn`
 * - `info`
 * - `debug`
 * - `trace`
 *
 * The available parameters are:
 * - `setLevel`: Set the logger level (defaults to `"trace"`).
 * - `setShowLevel`: Set the logger level display (defaults to `true`).
 * - `setShowTimestamp`: Set the logger timestamp display (defaults to `true`).
 * - `setForeignObjectStartAtNewLine`: Set the logger foreign object new line display (defaults to `false`).
 * - `setForeignObjectPadding`: Set the padding for foreign objects (defaults to `0`).
 * - `setForeignObjectIndent`: Set the indent for foreign objects (defaults to `4`).
 * - `setParameters`: Set all the parameters at once.
 * - `resetParameters`: Reset all the parameters to their default values.
 */
const logger = pino({ level: parameters.level }, stream) as pino.Logger & {
	/**
	 * Set the logger level, available levels are:
	 * - `fatal`
	 * - `error`
	 * - `warn`
	 * - `info`
	 * - `debug`
	 * - `trace`
	 *
	 * The logging level is a **minimum** level. For instance if `logger.level` is `"info"` then all
	 * `"fatal"`, `"error"`, `"warn"` and `"info"` logs will be enabled.
	 * @param level The new logger level.
	 */
	setLevel: (level: Parameters["level"]) => void

	/**
	 * Set the logger level display.
	 * @param showLevel Whether to show the level or not.
	 */
	setShowLevel: (showLevel: Parameters["showLevel"]) => void

	/**
	 * Set the logger timestamp display.
	 * @param showTimestamp Whether to show the timestamp or not.
	 */
	setShowTimestamp: (showTimestamp: Parameters["showTimestamp"]) => void

	/**
	 * Set the logger foreign object new line display (wether to start the foreign object on a new line or not).
	 * @param foreignObjectStartAtNewLine Whether to start the foreign object on a new line or not.
	 */
	setForeignObjectStartAtNewLine: (foreignObjectStartAtNewLine: Parameters["foreignObjectStartAtNewLine"]) => void

	/**
	 * Set the padding for foreign objects, it also accepts `"after-timestamp"` and
	 * `"after-level"` to automatically calculate the padding to match the beginning of the
	 * specified element.
	 * @param padding The padding for foreign objects.
	 */
	setForeignObjectPadding: (padding: Parameters["foreignObjectPadding"]) => void

	/**
	 * Set the indent for foreign objects.
	 * @param indent The indent for foreign objects.
	 */
	setForeignObjectIndent: (indent: Parameters["foreignObjectIndent"]) => void

	/**
	 * Set all the parameters at once.
	 * @param parameters The new parameters.
	 */
	setParameters: (parameters: Parameters) => void

	/**
	 * Reset all the parameters to their default values.
	 */
	resetParameters: () => void
}

// Inject the getters and setters

logger.setLevel = (level: Parameters["level"]) => {
	parameters.level = level
	logger.level = level
}

logger.setShowLevel = (showLevel: Parameters["showLevel"]) => {
	parameters.showLevel = showLevel
}

logger.setShowTimestamp = (showTimestamp: Parameters["showTimestamp"]) => {
	parameters.showTimestamp = showTimestamp
}

logger.setForeignObjectStartAtNewLine = (foreignObjectStartAtNewLine: Parameters["foreignObjectStartAtNewLine"]) => {
	parameters.foreignObjectStartAtNewLine = foreignObjectStartAtNewLine
}

logger.setForeignObjectPadding = (padding: Parameters["foreignObjectPadding"]) => {
	parameters.foreignObjectPadding = padding
}

logger.setForeignObjectIndent = (indent: Parameters["foreignObjectIndent"]) => {
	parameters.foreignObjectIndent = indent
}

logger.setParameters = (newParameters: Parameters) => {
	Object.assign(parameters, newParameters)
}

logger.resetParameters = () => {
	Object.assign(parameters, defaultParameters)
}

export default logger
