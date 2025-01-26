import { execSync } from "node:child_process"
import { hostname } from "node:os"

/**
 * Get the name of the host on which the application is running.
 * @returns The name of the host.
 */
export function getHostname() {
	switch (process.platform) {
		case "win32":
			return process.env.COMPUTERNAME
		case "darwin":
			return execSync("scutil --get ComputerName").toString().trim()
		case "linux": {
			const prettyName = execSync("hostnamectl --pretty").toString().trim()
			return prettyName === "" ? hostname() : prettyName
		}
		default:
			return hostname()
	}
}
