import type { Color, Colorette } from "colorette"
import dateFormat, { masks } from "dateformat"
import pino, { type LogDescriptor } from "pino"
import pretty from "pino-pretty"
import { stringify } from "@/main/json"

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
    alignForeignObject?: boolean
}

/**
 * The default parameters for the serverLogger instance.
 */
const defaultParameters: Parameters = {
    level: process.env.LOG_LEVEL || "trace",
    showLevel: true,
    showTimestamp: true,
    foreignObjectStartAtNewLine: false,
    foreignObjectPadding: 0,
    foreignObjectIndent: 4,
    alignForeignObject: false,
}

/**
 * Temporary parameters for the current serverLogger instance.
 */
const parameters: Parameters = { ...defaultParameters }

/**
 * Modify the format of the message depending on the log level.
 * @param log The log descriptor.
 * @param colors The Colorette instance used to colorize the output.
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
    if (parameters.showLevel) {
        formattedLevel = parameters.alignForeignObject ? `[${strLevel}] `.padEnd(8, " ") : `[${strLevel}] `
    }

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

    let finalLog = color(`${formattedDate}${formattedLevel}${log.msg}${formattedForeign}`)
    if (effect) finalLog = effect(finalLog)

    console.log(finalLog)

    return ""
}

/**
 * The pretty serverLogger stream, note that no keys are included by defaults, everything goes through
 * the message format function via the `log` object.
 */
const stream = pretty({
    crlf: false,
    colorize: true,
    sync: true,
    include: "",
    messageFormat: (log, _, __, { colors }) => formatMessage(log, colors),
})

/**
 * A custom serverLogger instance compatible with both front and back-end, allowing to log messages
 * with different levels ("fatal", "error", "warn", "info", "debug", "trace") and colors,
 * configurable through the setter methods documented below.
 */
const serverLogger = pino({ level: parameters.level }, stream) as pino.Logger & {
    /**
     * Set the serverLogger minimum level (defaults to "trace"), every log at or above this level
     * is enabled (e.g. "info" enables "fatal", "error", "warn" and "info").
     * @param level The new serverLogger level ("fatal", "error", "warn", "info", "debug" or "trace").
     */
    setLevel: (level: Parameters["level"]) => void

    /**
     * Set the serverLogger level display.
     * @param showLevel Whether to show the level or not (defaults to true).
     */
    setShowLevel: (showLevel: Parameters["showLevel"]) => void

    /**
     * Set the serverLogger timestamp display.
     * @param showTimestamp Whether to show the timestamp or not (defaults to true).
     */
    setShowTimestamp: (showTimestamp: Parameters["showTimestamp"]) => void

    /**
     * Set the serverLogger foreign object new line display (wether to start the foreign object on a new line or not).
     * @param foreignObjectStartAtNewLine Whether to start the foreign object on a new line or not (defaults to false).
     */
    setForeignObjectStartAtNewLine: (foreignObjectStartAtNewLine: Parameters["foreignObjectStartAtNewLine"]) => void

    /**
     * Set the padding for foreign objects, it also accepts `"after-timestamp"` and
     * `"after-level"` to automatically calculate the padding to match the beginning of the
     * specified element.
     * @param padding The padding for foreign objects (defaults to 0).
     */
    setForeignObjectPadding: (padding: Parameters["foreignObjectPadding"]) => void

    /**
     * Set the indent for foreign objects.
     * @param indent The indent for foreign objects (defaults to 4).
     */
    setForeignObjectIndent: (indent: Parameters["foreignObjectIndent"]) => void

    /**
     * Set whether to align any foreign object to the same column.
     * @param alignForeignObject Whether to align any foreign object to the same column (defaults to false).
     */
    setAlignForeignObject: (alignForeignObject: Parameters["alignForeignObject"]) => void

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

serverLogger.setLevel = (level: Parameters["level"]) => {
    parameters.level = level
    serverLogger.level = level
}

serverLogger.setShowLevel = (showLevel: Parameters["showLevel"]) => {
    parameters.showLevel = showLevel
}

serverLogger.setShowTimestamp = (showTimestamp: Parameters["showTimestamp"]) => {
    parameters.showTimestamp = showTimestamp
}

serverLogger.setForeignObjectStartAtNewLine = (
    foreignObjectStartAtNewLine: Parameters["foreignObjectStartAtNewLine"],
) => {
    parameters.foreignObjectStartAtNewLine = foreignObjectStartAtNewLine
}

serverLogger.setForeignObjectPadding = (padding: Parameters["foreignObjectPadding"]) => {
    parameters.foreignObjectPadding = padding
}

serverLogger.setForeignObjectIndent = (indent: Parameters["foreignObjectIndent"]) => {
    parameters.foreignObjectIndent = indent
}

serverLogger.setAlignForeignObject = (alignForeignObject: Parameters["alignForeignObject"] = false) => {
    parameters.alignForeignObject = alignForeignObject
}

serverLogger.setParameters = (newParameters: Parameters) => {
    Object.assign(parameters, newParameters)
}

serverLogger.resetParameters = () => {
    Object.assign(parameters, defaultParameters)
}

export default serverLogger
