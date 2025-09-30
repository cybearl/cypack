import type { NextApiRequest, NextApiResponse } from "next"
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
     * Returns a properly formatted success response.
     * @param status Status code to be sent in the response.
     * @param data Data to be sent in the response (optional, defaults to `null`).
     */
    successResponse(status: number, data?: unknown) {
        return this._res.status(status).send({
            success: true,
            data: this._checkDataValidity(data) ? data : null,
        })
    }

    /**
     * Returns a properly formatted error response, based on error constants.
     * @param error Error code constant to be sent in the response.
     * @param data Additional data to be sent in the response (optional).
     * @param message Error message to be sent in the response (optional, defaults to the internal error message).
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
     * Run and route the request to the appropriate method.
     * @returns The response from the method.
     */
    async run() {
        const methodInput: NextApiMethodInput = {
            req: this._req,
            res: this._res,
            wrapper: this,
        }

        try {
            switch (this._req.method) {
                case "GET":
                    if (this._read) return await this._executeMethod(this._read, methodInput)
                    break
                case "POST":
                    if (this._write) return await this._executeMethod(this._write, methodInput)
                    break
                case "PATCH":
                    if (this._update) return await this._executeMethod(this._update, methodInput)
                    break
                case "PUT":
                    if (this._replace) return await this._executeMethod(this._replace, methodInput)
                    break
                case "DELETE":
                    if (this._remove) return await this._executeMethod(this._remove, methodInput)
                    break
                default:
                    return this.errorResponse(BaseErrors.METHOD_NOT_ALLOWED)
            }
        } catch (error) {
            return this.errorResponse(BaseErrors.INTERNAL_SERVER_ERROR, error)
        }
    }
}
