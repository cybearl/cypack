import type * as Colorette from "colorette"
import pino from "pino"
import pretty from "pino-pretty"

// /**
//  * Modify the format of the message depending on the log level.
//  * @param log The log descriptor.
//  * @returns The formatted message.
//  */
// function formatMessage(log: LogDescriptor, messageKey: string, levelLabel: string, extras: PrettifierExtras): string {
// 	const trace = `\u001b[30m${log.msg}\u001b[0m` // Cyan text
// 	const debug = `\u001b[34m${log.msg}\u001b[0m` // Blue text
// 	const info = `\u001b[32m${log.msg}\u001b[0m` // Default text
// 	const warn = `\u001b[33m${log.msg}\u001b[0m` // Yellow text
// 	const error = `\u001b[31m${log.msg}\u001b[0m` // Red text
// 	const fatal = `\u001b[41m\u001b[37m${log.msg}\u001b[0m` // Red background with white text

// 	if (typeof log.level === "string") {
// 		switch (log.level) {
// 			case "trace":
// 				return trace
// 			case "debug":
// 				return debug
// 			case "info":
// 				return info
// 			case "warn":
// 				return warn
// 			case "error":
// 				return error
// 			case "fatal":
// 				return fatal
// 			default:
// 				return log.msg
// 		}
// 	}

// 	switch (log.level) {
// 		case 10:
// 			return trace
// 		case 20:
// 			return debug
// 		case 30:
// 			return info
// 		case 40:
// 			return warn
// 		case 50:
// 			return error
// 		case 60:
// 			return fatal
// 		default:
// 			return log.msg
// 	}
// }

function prettifier(
	inputData: string | object,
	key: string,
	log: object,
	extras: { colors: Colorette.Colorette },
): string {
	console.log("inputData", inputData)
	console.log("key", key)
	console.log("log", log)
	console.log("extras", extras)
	return "fesse"
}

const stream = pretty({
	colorize: true,
	ignore: "time,level,hostname,pid,name,msg,caller",
	translateTime: "yyyy-mm-dd HH:MM:ss",
	customPrettifiers: {
		time: prettifier,
		level: prettifier,
		hostname: prettifier,
		pid: prettifier,
		name: prettifier,
		msg: prettifier,
		caller: prettifier,
	},
})

const logger = pino(
	{
		level: process.env.LOG_LEVEL || "trace",
	},
	stream,
)

export default logger
