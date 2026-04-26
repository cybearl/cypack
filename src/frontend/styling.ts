import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names without style conflicts.
 * @param inputs The Tailwind CSS classes to merge.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * The type for a CSS delay value, either a number (milliseconds) or a CSS string ("1s", "500ms").
 */
export type CSSDelay = `${number}s` | `${number}ms` | number

/**
 * Converts a CSS delay string to milliseconds.
 * @param delay A CSS delay string ("1s", "500ms") or a number already in milliseconds.
 * @returns The delay in milliseconds, or 0 if the format is unrecognized.
 */
export function convertCssDelayToMs(delay: CSSDelay): number {
    if (typeof delay === "number") return delay

    const match = delay.match(/(\d+(\.\d+)?)(s|ms)/)
    if (!match) return 0

    const value = Number.parseFloat(match[1])
    const unit = match[3]

    return unit === "s" ? value * 1000 : value
}
