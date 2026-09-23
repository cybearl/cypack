import type { NextApiRequest, NextApiResponse } from "next"
import CyCONSTANTS from "@/main/constants"
import { BaseErrors } from "@/main/errors"
import type { ErrorObj, FailedRequest } from "@/main/types/requests"

/**
 * The type for the overall wrapper options.
 */
// biome-ignore lint/complexity/noBannedTypes: Unused for now
type WrapperOptions = {}

/**
 * The type for a Next API wrapped method input.
 */
export type NextApiMethodInput = {
    req: NextApiRequest
    res: NextApiResponse
    wrapper: NextApiWrapper
}

/**
 * The type for a Next API wrapped method.
 */
type NextApiMethod = ({ req, res, wrapper }: NextApiMethodInput) => Promise<void> | void

/**
 * The type for a Next API wrapped method, extended with specific options.
 */
type NextApiMethodWithOptions = {
    method: NextApiMethod
}

/**
 * An object containing all methods for the API route.
 */
type NextApiMethods = {
    read?: NextApiMethod | NextApiMethodWithOptions
    write?: NextApiMethod | NextApiMethodWithOptions
    update?: NextApiMethod | NextApiMethodWithOptions
    replace?: NextApiMethod | NextApiMethodWithOptions
    remove?: NextApiMethod | NextApiMethodWithOptions
}

/**
 * A class that wraps the Next.js API routes.
 */
export default class NextApiWrapper {
    private _req!: NextApiRequest
    private _res!: NextApiResponse

    // Methods
    private _read: NextApiMethod | NextApiMethodWithOptions | undefined
    private _write: NextApiMethod | NextApiMethodWithOptions | undefined
    private _update: NextApiMethod | NextApiMethodWithOptions | undefined
    private _replace: NextApiMethod | NextApiMethodWithOptions | undefined
    private _remove: NextApiMethod | NextApiMethodWithOptions | undefined

    // Options
    private _options!: WrapperOptions

    /**
     * The constructor for the `NextApiWrapper` class.
     * @param req The `NextApiRequest` object.
     * @param res The `NextApiResponse` object.
     * @param methods The methods to be used for the API route:
     * - `read`: The *GET* method.
     * - `write`: The *POST* method.
     * - `update`: The *PATCH* method.
     * - `replace`: The *PUT* method.
     * - `remove`: The *DELETE* method.
     * @param options The options for the wrapper:
     * - (Currently none)
     */
    constructor(req: NextApiRequest, res: NextApiResponse, methods?: NextApiMethods, options?: WrapperOptions) {
        this.setRequestResponse(req, res)
        this.setMethods(methods || {})
        this.setOptions(options || {})
    }

    /**
     * Set request and response objects.
     * @param req The new `NextApiRequest` object.
     * @param res The new `NextApiResponse` object.
     */
    setRequestResponse(req: NextApiRequest, res: NextApiResponse) {
        this._req = req
        this._res = res
    }

    /**
     * Set methods for the API route.
     * @param methods The new methods to be used for the API route:
     * - `read`: The *GET* method.
     * - `write`: The *POST* method.
     * - `update`: The *PATCH* method.
     * - `replace`: The *PUT* method.
     * - `remove`: The *DELETE* method.
     */
    setMethods(methods: NextApiMethods) {
        this._read = methods?.read
        this._write = methods?.write
        this._update = methods?.update
        this._replace = methods?.replace
        this._remove = methods?.remove
    }

    /**
     * Set options for the API route.
     * @param options The new options for the wrapper:
     * - (Currently none)
     */
    setOptions(options: Partial<WrapperOptions>) {
        this._options = { ...this._options, ...options }
    }

    /**
     * A private method to check data validity.
     * @param data The data to be checked.
     * @returns Whether the data is valid.
     */
    private _checkDataValidity(data: unknown) {
        if (data === undefined || data === null) return false
        return true
    }

    /**
     * Returns a properly formatted success response, without a body for statuses that can't carry one (204, 304).
     * @param status Status code to be sent in the response.
     * @param data Data to be sent in the response (optional, defaults to `null`).
     */
    successResponse(status: number, data?: unknown): void {
        if (CyCONSTANTS.NO_BODY_HTTP_STATUSES.includes(status)) {
            this._res.status(status).end()
            return
        }

        this._res.status(status).send({
            success: true,
            data: this._checkDataValidity(data) ? data : null,
        })
    }

    /**
     * Returns a properly formatted error response, based on error constants.
     * @param error Error code constant to be sent in the response.
     * @param data Additional data to be sent in the response (optional).
     * @param message Error message to be sent in the response (optional, defaults to the internal error message).
     * @returns The result of sending the error response.
     */
    errorResponse(error: ErrorObj, data?: unknown, message?: string) {
        const response: FailedRequest = {
            success: false,
            message: message || error.message,
            error: this._checkDataValidity(data) ? { ...error, data } : error,
        }

        return this._res.status(error.status).send(response)
    }

    /**
     * Check if a method is a direct method or a method with options and execute it.
     * @param method The method to be checked.
     * @param methodInput The method input object.
     * @returns Whether the method was executed successfully.
     */
    private async _executeMethod(method: NextApiMethod | NextApiMethodWithOptions, methodInput: NextApiMethodInput) {
        if (typeof method === "function") {
            await method(methodInput)
            return true
        }

        await method.method(methodInput)
        return true
    }

    /**
     * Maps each HTTP method to its registered route method.
     * @returns The route methods, keyed by HTTP method.
     */
    private _getMethodsByHttpMethod(): Record<string, NextApiMethod | NextApiMethodWithOptions | undefined> {
        return {
            GET: this._read,
            POST: this._write,
            PATCH: this._update,
            PUT: this._replace,
            DELETE: this._remove,
        }
    }

    /**
     * Run and route the request to the appropriate method, answering 405 (with an "Allow" header)
     * when no method is registered for the request's HTTP method.
     * @returns The response from the method.
     */
    async run() {
        const methodsByHttpMethod = this._getMethodsByHttpMethod()
        const method = methodsByHttpMethod[this._req.method ?? ""]

        if (!method) {
            const allowedHttpMethods = Object.keys(methodsByHttpMethod).filter(key => methodsByHttpMethod[key])
            this._res.setHeader("Allow", allowedHttpMethods.join(", "))

            return this.errorResponse(BaseErrors.METHOD_NOT_ALLOWED)
        }

        const methodInput: NextApiMethodInput = {
            req: this._req,
            res: this._res,
            wrapper: this,
        }

        try {
            return await this._executeMethod(method, methodInput)
        } catch (error) {
            // The method may have already answered before throwing, a second response would throw too
            if (this._res.headersSent) return false

            return this.errorResponse(BaseErrors.INTERNAL_SERVER_ERROR, error)
        }
    }
}
