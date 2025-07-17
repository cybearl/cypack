<p align="center">
  <br />
  <a href="https://www.cybearl.com" target="_blank"><img width="100px" src="https://cybearl.com/_next/image?url=%2Fimages%2Flogo.webp&w=640&q=75" /></a>
  <h2 align="center">@cybearl/cypack</h2>
  <p align="center">A set of general utilities for Cybearl projects.</p>
</p>

This package includes multiple centralized utilities for the Cybearl application and API service. It is designed to be a single package that can be used in both the client and server side of the application. It is also designed to be well-optimized and well-documented for easy use.

Integration into your project
-----------------------------
#### 0. Install the package
```typescript
// With npm
$ npm install @cybearl/cypack

// With yarn
$ yarn add @cybearl/cypack
```
And that's it! You can now use the utilities in your project.

Categories and utilities
------------------------
Note that the package is divided into three modules:
- `backend` (`@cybearl/cypack/backend`): Contains utilities that are meant to be used in the backend.
- `frontend` (`@cybearl/cypack/frontend`): Contains utilities that are meant to be used in the frontend.
- `main` (`@cybearl/cypack`): Contains utilities that can be used in both the client and server side of the application.

Backend utilities
-----------------
#### Benchmark utilities
- `Bench`: A class that provides a simple way to benchmark functions.

#### CyBuffer class
- `CyBuffer`: A class that extends the Uint8Array class with additional methods to read and write data.

#### Cybearl General API System
- `generateCGASStatus`: Generates a Cybearl General API System (CGAS) status object.

#### Host-related utilities
Contains utilities to get the hostname and other host-related information.
- `getHostname`: Get the name of the host on which the application is running.

#### Logger utilities
Contains a simple multi-level logger that logs to the console based on `Winston`.
- `logger`: A simple multi-level logger that logs to the console based on `Winston`.

#### Next.js utilities
Contains utilities to get the Next.js server and other Next.js-related information.
- `NextApiWrapper`: A class that wraps the Next.js API route handler (specifically for page router):
  ```typescript
  function read({ req, wrapper }: NextApiMethodInput) {
  	  if (!req.query.blabla) return wrapper.errorResponse(AppErrors.UNAUTHORIZED)
  	  return wrapper.successResponse(200, status)
  }

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  	  const wrapper = new NextApiWrapper(req, res, { read })
  	  await wrapper.run()
  }
  ```

Frontend utilities
------------------
#### Cybearl General API System
- `getCGASStatus`: Returns the current status of the application, or the application marker only if specified,
  in the Cybearl General API System (CGAS) format.
- `fallbackCGASStatus`: The fallback CGAS status, used when the CGAS API is not available.

#### URLs utilities
Contains utilities to manipulate URLs.
- `addParamsToUrl`: Allows to add query parameters to a URL.
- `currentUrlOrigin`: Get the current URL origin or null if it's not available.

Main utilities
--------------
#### Checks utilities
- `isServer`: Check if the code is running on the server.
- `isClient`: Check if the code is running on the client.

#### Configuration utilities
- `CyCONSTANTS`: Multiple constants used throughout the application (user password length, etc.).

#### Error utilities
Contains a set of base error that follows the Cybearl error format, and other error-related utilities.
- `formatErrorResponse`: Formats an error response object.
- `stringifyError`: Stringifies an error object.
- `parseCRUDError`: Parse the error of a CRUD call and return a standardized error.
- `formatMessageAsStringifiedError`: Formats a message and an error object into a JSON string that follows the `FailedRequest` standard.
- `BaseError`: The base error class that all Cybearl errors inherit from, don't forget to do:
  ```typescript
  export const AppErrors = {
      ...BaseErrors,
      // Add your custom errors here
  } as const satisfies Record<string, ErrorObj>
  ```
  To be sure that you respect the error format.

#### Formatting utilities
Contains a set of utilities to format numbers, time, and other values.
- `isValidIntId`: Validate a direct ID parameter (as integer for SQL DBs etc..).
- `isValidSlug`: Validates a slug.
- `formatUnit`: Format a number with an attached unit + an optional time unit.
- `formatHRTime`: Format a high-resolution time, into a responsive string with the en-US locale format.
- `formatTime`: Format a time in milliseconds into a responsive string with the en-US locale format.
- `formatPercentage`: Formats a number as a percentage.
- `truncateString`: Truncate a string to a specified length.

#### JSON utilities
Contains utilities to parse and stringify JSON objects.
- `formatJson`: Format a JSON object with indentation.
- `stringify`: Stringify a JSON object with support for BigInt and functions.

#### Math utilities
Contains utilities to perform mathematical operations.
- `mapRange`: Maps a number from one range to another.

#### Middleware utilities
Contains utilities to create middleware functions (for Next.js, etc.).
- `fullyPermissiveCspHeader`: A Content Security Policy (CSP) header that allows everything, used for development.

#### String utilities
Contains utilities to manipulate strings.
- `convertErrorToString`: Safely converts any error into a string for parsing/searching.
- `decodeObjectURIComponents`: Decodes all components of an object as URI components (e.g., for decoding Next.js `req.query`).

#### Styling utilities
Contains utilities to manipulate CSS styles.
- `shadeColor`: Shades a color by a percentage.

Related types
-------------
- `Bit`: A single bit value used by CyBuffer.
- `BenchmarkResult`: The type of the benchmark function result.
- `BenchmarkResults`: An object containing multiple benchmark results, ordered by functions.
- `CGASStatusString`: The type for the CGAS status string (`enabled`, `disabled`, `in-maintenance`, `in-development`).
- `CGASStatus`: The Cybearl General API System (CGAS) status response.
- `Endianness`: The endianness (`LE` or `BE`).
- `ErrorObj`: The type definition for an error object.
- `StringEncoding`: The available string encoding instruction for the `CyBuffer` string methods.
- `SuccessfulRequest`: The type for a successful request, containing the data of type T.
- `FailedRequest`: The type for a failed request, containing the error message and the error object.
- `RequestResult`: Returns a failed request in case the `success` field is set to `false`,
  otherwise returns a successful request with a data object of type T.

Dev notes
---------
*N/A*
