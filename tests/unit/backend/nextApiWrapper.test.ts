import type { NextApiRequest, NextApiResponse } from "next"
import { describe, test } from "vitest"
import NextApiWrapper from "@/backend/next/nextApiWrapper"
import NextAuthApiWrapper from "@/backend/next/nextAuthApiWrapper"

/**
 * A minimal `NextApiResponse` mock, recording what the wrapper sends.
 */
type MockResponse = NextApiResponse & {
    statusCode: number
    headers: Record<string, string>
    body: unknown
    isEnded: boolean
}

/**
 * Creates a request with the given HTTP method.
 * @param method The HTTP method of the request.
 * @returns The mocked request.
 */
function createRequest(method: string): NextApiRequest {
    return { method } as NextApiRequest
}

/**
 * Creates a response recording its status, headers and body.
 * @returns The mocked response.
 */
function createResponse(): MockResponse {
    const res = {
        statusCode: 200,
        headers: {},
        body: undefined,
        isEnded: false,
        headersSent: false,
    } as unknown as MockResponse

    res.status = (status: number) => {
        res.statusCode = status
        return res
    }

    res.setHeader = (name: string, value: string) => {
        res.headers[name] = value
        return res
    }

    res.send = (body: unknown) => {
        res.body = body
        res.isEnded = true
        Object.assign(res, { headersSent: true })
    }

    res.end = () => {
        res.isEnded = true
        Object.assign(res, { headersSent: true })
        return res
    }

    return res
}

describe("NextApiWrapper", () => {
    test("It should run the method registered for the HTTP method", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("GET"), res, {
            read: ({ wrapper }) => wrapper.successResponse(200, { value: 1 }),
        })

        await wrapper.run()
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ success: true, data: { value: 1 } })
    })

    test("It should answer 405 with an Allow header when a known method has no handler", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("POST"), res, {
            read: ({ wrapper }) => wrapper.successResponse(200),
            remove: ({ wrapper }) => wrapper.successResponse(200),
        })

        await wrapper.run()
        expect(res.isEnded).toBe(true)
        expect(res.statusCode).toBe(405)
        expect(res.headers.Allow).toBe("GET, DELETE")
    })

    test("It should answer 405 for an unknown HTTP method", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("OPTIONS"), res, {
            read: ({ wrapper }) => wrapper.successResponse(200),
        })

        await wrapper.run()
        expect(res.statusCode).toBe(405)
        expect(res.headers.Allow).toBe("GET")
    })

    test("It should send no body with a 204 response", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("GET"), res, {
            read: ({ wrapper }) => wrapper.successResponse(204, { ignored: true }),
        })

        await wrapper.run()
        expect(res.statusCode).toBe(204)
        expect(res.isEnded).toBe(true)
        expect(res.body).toBeUndefined()
    })

    test("It should answer 500 when the method throws", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("GET"), res, {
            read: () => {
                throw new Error("Boom")
            },
        })

        await wrapper.run()
        expect(res.statusCode).toBe(500)
    })

    test("It should not answer twice when the method throws after answering", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextApiWrapper(createRequest("GET"), res, {
            read: ({ wrapper }) => {
                wrapper.successResponse(200, { value: 1 })
                throw new Error("Boom")
            },
        })

        await wrapper.run()
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ success: true, data: { value: 1 } })
    })
})

describe("NextAuthApiWrapper", () => {
    test("It should answer 405 with an Allow header when a known method has no handler", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextAuthApiWrapper(createRequest("PUT"), res, {
            read: ({ wrapper }) => wrapper.successResponse(200),
        })

        await wrapper.run()
        expect(res.isEnded).toBe(true)
        expect(res.statusCode).toBe(405)
        expect(res.headers.Allow).toBe("GET")
    })

    test("It should send no body with a 204 response", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextAuthApiWrapper(createRequest("DELETE"), res, {
            remove: ({ wrapper }) => wrapper.successResponse(204),
        })

        await wrapper.run()
        expect(res.statusCode).toBe(204)
        expect(res.body).toBeUndefined()
    })

    test("It should check authentication before routing", async ({ expect }) => {
        const res = createResponse()
        const wrapper = new NextAuthApiWrapper(
            createRequest("GET"),
            res,
            {
                read: ({ wrapper }) => wrapper.successResponse(200),
            },
            {
                authFunction: async () => null,
                requireAuth: true,
            },
        )

        await wrapper.run()
        expect(res.statusCode).toBe(401)
    })
})
