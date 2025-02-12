import { BaseErrors } from "@/backend/errors"
import type { ErrorObj, FailedRequest } from "@/main/types/requests"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Session } from "next-auth"

/**
 * A session with a user extended with optional roles.
 */
export type ExtendedSession = Session & {
	user: Session["user"] & {
		roles: string[] | undefined
	}
}

/**
 * The type for the authentication options.
 */
export type AuthOptions = {
	requireAuth?: boolean
	hasRole?: string
	hasSomeRoles?: string[]
	hasAllRoles?: string[]
}

/**
 * The type for the overall wrapper options.
 */
type WrapperOptions = AuthOptions & {
	authFunction?: (req: NextApiRequest, res: NextApiResponse) => Promise<ExtendedSession | null>
	roles?: string[]
}

/**
 * The type for a Next API wrapped method.
 */
export type NextApiMethodInput = {
	req: NextApiRequest
	res: NextApiResponse
	session: ExtendedSession | null
	wrapper: NextApiWrapper
}

/**
 * The type for a Next API wrapped method.
 */
type NextApiMethod = ({ req, res, session, wrapper }: NextApiMethodInput) => Promise<void> | void

/**
 * The type for a Next API wrapped method, extended with specific auth options.
 */
type NextApiMethodWithAuthOptions = {
	method: NextApiMethod
	authOptions?: AuthOptions
}

/**
 * A class that wraps the Next.js API routes.
 */
export default class NextApiWrapper {
	private _req: NextApiRequest
	private _res: NextApiResponse
	private _options: WrapperOptions

	// Methods
	private _get: NextApiMethod | NextApiMethodWithAuthOptions | undefined
	private _post: NextApiMethod | NextApiMethodWithAuthOptions | undefined
	private _patch: NextApiMethod | NextApiMethodWithAuthOptions | undefined
	private _delete: NextApiMethod | NextApiMethodWithAuthOptions | undefined

	/**
	 * The constructor for the NextApiWrapper class.
	 * @param req The `NextApiRequest` object.
	 * @param res The `NextApiResponse` object.
	 * @param methods The methods to be used for the API route.
	 * @param options The options for the wrapper:
	 * - `requireAuth`: Whether to require authentication (defaults to `false`).
	 * - `hasRole`: The user needs to have the role.
	 * - `hasSomeRoles`: The user needs to have at least one of the roles.
	 * - `hasAllRoles`: The user needs to have all of the roles.
	 */
	constructor(
		req: NextApiRequest,
		res: NextApiResponse,
		methods?: {
			get?: NextApiMethod | NextApiMethodWithAuthOptions
			post?: NextApiMethod | NextApiMethodWithAuthOptions
			patch?: NextApiMethod | NextApiMethodWithAuthOptions
			delete?: NextApiMethod | NextApiMethodWithAuthOptions
		},
		options?: WrapperOptions,
	) {
		this._req = req
		this._res = res
		this._options = options || {}

		// Methods
		this._get = methods?.get
		this._post = methods?.post
		this._patch = methods?.patch
		this._delete = methods?.delete
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
	 * Verify if the user has a specific role.
	 * @param user The user object.
	 * @param role The role to be checked.
	 * @returns Whether the user has the role.
	 */
	hasRole(user: ExtendedSession["user"], role: string) {
		return user.roles?.includes(role)
	}

	/**
	 * Verify if the user has at least one of the roles.
	 * @param user The user object.
	 * @param roles The roles to be checked.
	 * @returns Whether the user has at least one of the roles.
	 */
	hasSomeRoles(user: ExtendedSession["user"], roles: string[]) {
		return roles.some(role => user.roles?.includes(role))
	}

	/**
	 * Verify if the user has all of the roles.
	 * @param user The user object.
	 * @param roles The roles to be checked.
	 * @returns Whether the user has all of the roles.
	 */
	hasAllRoles(user: ExtendedSession["user"], roles: string[]) {
		return roles.every(role => user.roles?.includes(role))
	}

	/**
	 * Check the authentication and roles of the user based on the auth options.
	 * @param session The session object.
	 * @param authOptions The authentication options.
	 * @returns Whether the user has the required authentication and roles.
	 */
	checkAuthOptions(session: ExtendedSession | null, authOptions: AuthOptions) {
		if (authOptions.requireAuth) {
			if (!session) {
				this.errorResponse(BaseErrors.UNAUTHORIZED)
				return false
			}
		}

		if (authOptions.hasRole) {
			if (!session || !this.hasRole(session.user, authOptions.hasRole)) {
				this.errorResponse(BaseErrors.UNAUTHORIZED)
				return false
			}
		}

		if (authOptions.hasSomeRoles) {
			if (!session || !this.hasSomeRoles(session.user, authOptions.hasSomeRoles)) {
				this.errorResponse(BaseErrors.UNAUTHORIZED)
				return false
			}
		}

		if (authOptions.hasAllRoles) {
			if (!session || !this.hasAllRoles(session.user, authOptions.hasAllRoles)) {
				this.errorResponse(BaseErrors.UNAUTHORIZED)
				return false
			}
		}

		return true
	}

	/**
	 * Check if a method is a direct method or a method with auth options and execute it.
	 * @param method The method to be checked.
	 * @param methodInput The method input object.
	 * @returns Whether the method was executed successfully.
	 */
	private async _executeMethod(
		method: NextApiMethod | NextApiMethodWithAuthOptions,
		methodInput: NextApiMethodInput,
	) {
		if (typeof method === "function") {
			await method(methodInput)
			return true
		}

		if (method.authOptions) {
			const authCheckRes = this.checkAuthOptions(methodInput.session, method.authOptions)
			if (!authCheckRes) return false
		}

		await method.method(methodInput)
		return true
	}

	/**
	 * Run and route the request to the appropriate method.
	 * @returns The response from the method.
	 */
	async run() {
		const session = this._options.authFunction ? await this._options.authFunction(this._req, this._res) : null
		const authCheckRes = this.checkAuthOptions(session, this._options)
		if (!authCheckRes) return

		const methodInput: NextApiMethodInput = {
			req: this._req,
			res: this._res,
			session,
			wrapper: this,
		}

		switch (this._req.method) {
			case "GET":
				if (this._get) return await this._executeMethod(this._get, methodInput)
				break
			case "POST":
				if (this._post) return await this._executeMethod(this._post, methodInput)
				break
			case "PATCH":
				if (this._patch) return await this._executeMethod(this._patch, methodInput)
				break
			case "DELETE":
				if (this._delete) return await this._executeMethod(this._delete, methodInput)
				break
		}

		return this.errorResponse(BaseErrors.METHOD_NOT_ALLOWED)
	}
}
