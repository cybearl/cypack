<p align="center">
  <br />
  <a href="https://www.cybearl.com" target="_blank"><img width="100px" src="https://cybearl.com/_next/image?url=%2Fimages%2Flogo.webp&w=640&q=75" /></a>
  <h2 align="center">@cybearl/cypack</h2>
  <p align="center">A set of general utilities for Cybearl projects.</p>
</p>

This package provides a centralized set of utilities for Cybearl projects. It is designed to work in both client and server environments and is split into three entry points to keep each environment's footprint minimal.

Integration into your project
-----------------------------
#### 0. Install the package
```bash
# With npm
npm install @cybearl/cypack

# With yarn
yarn add @cybearl/cypack
```

Categories and utilities
------------------------
The package is divided into three modules:
- `@cybearl/cypack`: Universal utilities usable in both browser and Node.js.
- `@cybearl/cypack/backend`: Node.js-only utilities (server, API routes, etc.).
- `@cybearl/cypack/frontend`: Browser-side utilities (React, Next.js client components, etc.).

Backend utilities
-----------------
#### Benchmark utilities
- `Bench`: A class that provides a simple way to benchmark functions.

#### Crypto
Note that these are stored inside a `crypto` object exported from the package.
- `aes256Gcm` (AES-256-GCM symmetric encryption):
  - `encrypt`: Encrypts data using AES-256-GCM symmetric encryption.
  - `decrypt`: Decrypts data using AES-256-GCM symmetric encryption.
  - `decryptPayload`: Decrypts a payload containing the initialization vector, ciphertext, and authentication tag.

#### CyBuffer
- `CyBuffer`: Extends `Uint8Array` with additional methods to read and write typed data.

#### Cybearl General API System
- `generateCGASStatus`: Generates a CGAS status object.

#### Headers utilities
Contains utilities to convert between Node.js and Web API header formats.
- `convertNodeHeadersToWebHeaders`: Converts Node.js `IncomingHttpHeaders` to the Web API `Headers` format.

#### Host utilities
- `getHostname`: Returns the name of the host on which the application is running.

#### Logger
A configurable, pino-based structured logger for Node.js server environments.
- `serverLogger`: The default logger instance. Supports levels `fatal`, `error`, `warn`, `info`, `debug`, `trace` and exposes chainable setters:
  - `setLevel`: Set the minimum log level.
  - `setShowLevel`: Toggle level display.
  - `setShowTimestamp`: Toggle timestamp display.
  - `setForeignObjectStartAtNewLine`: Start any attached foreign object on a new line.
  - `setForeignObjectPadding`: Set padding for foreign object alignment (also accepts `"after-timestamp"` and `"after-level"`).
  - `setForeignObjectIndent`: Set indentation for foreign objects.
  - `setAlignForeignObject`: Align all foreign objects to the same column.
  - `setParameters` / `resetParameters`: Set or reset all parameters at once.

#### Next.js utilities
- `NextApiWrapper`: Wraps a Next.js page-router API handler with structured method dispatch:
  ```typescript
  function read({ req, wrapper }: NextApiMethodInput) {
      if (!req.query.id) return wrapper.errorResponse(AppErrors.UNAUTHORIZED)
      return wrapper.successResponse(200, data)
  }

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const wrapper = new NextApiWrapper(req, res, { read })
      await wrapper.run()
  }
  ```
- `NextAuthApiWrapper`: Same as `NextApiWrapper` but with built-in NextAuth support.

Frontend utilities
------------------
#### Cybearl General API System
- `getCGASStatus`: Returns the current CGAS status of the application.
- `fallbackCGASStatus`: The fallback CGAS status used when the CGAS API is unavailable.

#### Styling utilities
Contains utilities for Tailwind CSS class merging and CSS value conversion.
- `cn`: Merges Tailwind CSS class names without style conflicts (wraps `clsx` + `tailwind-merge`).
- `convertCssDelayToMs`: Converts a CSS delay string (e.g., `"1s"`, `"500ms"`) or a plain number to milliseconds.

#### URL utilities
- `addParamsToUrl`: Adds query parameters to a URL, skipping null/undefined values.
- `currentUrlOrigin`: The current URL origin, or `null` if unavailable (e.g., during SSR).

Main utilities
--------------
#### Check utilities
- `isClient`: Returns `true` when running in a browser environment.
- `isServer`: Returns `true` when running in a Node.js environment.
- `arrayEqual`: Compares two arrays for shallow equality.

#### Constants
- `CyCONSTANTS`: Shared constants used across Cybearl projects:
  - Security: `HASH_SALT_ROUNDS`.
  - User fields: `(MIN|MAX)_USERNAME_LENGTH`, `(MIN|MAX)_PASSWORD_LENGTH`, `MAX_NAME_LENGTH`, etc.
  - Validation: `USERNAME_REGEX`, `SLUG_REGEX`.
  - Image sizes: `IMG_SIZES_(HIGH|MEDIUM|BASE|LOW)_QUALITY`.

#### Countries
- `Country`: All countries with their details (name, code, continent, etc.), based on ISO 3166-1 alpha-2.
- `formatCountryName`: Formats a country name from camelCase to a spaced string.
- `COUNTRIES_SELECT_FIELD`: Countries pre-formatted for use in select fields.
- `getCountryNameFromCode`: Returns the country name for a given ISO 3166-1 alpha-2 code.

#### Environment utilities
Contains utilities to validate environment variables at startup, with protection against private variables leaking into the client bundle.
- `checkEnvironmentVariables`: Checks that all required variables are present for the current environment (server or client) and throws if any are missing or if private variables are exposed to the client. Logs errors instead of throwing in production.
  ```typescript
  checkEnvironmentVariables(
      {
          public:  ["NODE_ENV", "NEXT_PUBLIC_APP_URL"],
          private: ["DATABASE_URL", "SECRET_KEY"],
      },
      {
          NODE_ENV:             process.env.NODE_ENV,
          NEXT_PUBLIC_APP_URL:  process.env.NEXT_PUBLIC_APP_URL,
          DATABASE_URL:         process.env.DATABASE_URL,
          SECRET_KEY:           process.env.SECRET_KEY,
      },
  )
  ```
  Note: the second argument must inline `process.env.X` calls directly, dynamic key access (`process.env[name]`) is eliminated by most bundlers at build time.

#### Error utilities
- `formatErrorResponse`: Formats an error response object.
- `stringifyError`: Stringifies an error object.
- `parseCRUDError`: Parses the error from a CRUD call and returns a standardized error.
- `formatMessageAsStringifiedError`: Formats a message and error into a JSON string following the `FailedRequest` standard.
- `BaseErrors`: A set of standard HTTP error definitions. Extend it for your app:
  ```typescript
  export const AppErrors = {
      ...BaseErrors,
      // Add custom errors here
  } as const satisfies Record<string, ErrorObj>
  ```

#### Formatting utilities
- `isValidIntId`: Validates an integer ID parameter (for SQL databases, etc.).
- `isValidSlug`: Validates a slug string.
- `formatUnit`: Formats a number with a unit and optional time unit, using SI prefixes (k, M, G … Y).
- `formatHRTime`: Formats a high-resolution time (nanoseconds as `bigint`) into a human-readable string.
- `formatTime`: Formats a duration in milliseconds into a human-readable string.
- `formatPercentage`: Formats a number as a percentage string.
- `formatBytes`: Formats a byte count into a human-readable string (KB, MB, GB, etc.).
- `formatRelativeTime`: Formats a `Date` as a relative time string (e.g., `"just now"`, `"5m ago"`, `"3h ago"`).
- `formatDate`: Formats a `Date` as a locale-aware datetime string (e.g., `"04/25/2026, 03:45:00 PM"`).
- `bigintToScientific`: Formats a `bigint` as a `[coefficient, exponent]` scientific notation tuple using only integer arithmetic, supports arbitrarily large values.
- `bigintToMetricFormatted`: Formats a `bigint` as a metric-prefixed string (e.g., `1500n` → `"1.5k"`). Supports up to exa (E).
- `truncateString`: Truncates a string to a specified length, appending `"..."`.
- `parseQueryNumberArray`: Parses a comma-separated query string into an array of numbers.
- `parseQueryStringArray`: Parses a comma-separated query string into an array of strings.
- `slugifyName`: Slugifies a name, with support for automatic number incrementing on collision.

#### JSON utilities
- `formatJson`: Re-formats a JSON string with 4-space indentation.
- `stringify`: Stringifies a value with support for `BigInt` and functions.

#### Logger
A zero-dependency isomorphic Next.js-compatible logger that works in both browser and Node.js. ANSI indicators are automatically suppressed in browser environments.
- `nextLogger`: The default logger instance.
- `createNextLogger(prefix?, prefixLength?)`: Creates a new logger instance with an optional default prefix and column width for prefix alignment.
  - `.success` / `.info` / `.warn` / `.error` / `.debug`: Log at the respective level.
  - `.withPrefix(prefix)`: Returns a new logger with the given prefix fixed as its default.
- `generateNextLoggerPrefix(uuid, prefix?)`: Derives a short prefix from a UUID (e.g., `"worker-a1b"`), useful for per-job logger scoping.
- `NEXT_LOG_INDICATORS`: The ANSI indicator strings used by the logger (`success`, `warning`, `error`, `info`, `debug`).

#### Math utilities
- `mapRange`: Maps a number from one range to another.
- `safeAverage`: Safely computes an average from a total and count (guards against division by zero).
- `safePercentage`: Safely computes a percentage from a numerator and denominator.

#### Middleware utilities
- `fullyPermissiveCspHeader`: A Content Security Policy header that allows everything, intended for development use.

#### String utilities
- `convertErrorToString`: Safely converts any error value to a string.
- `decodeObjectURIComponents`: Decodes all string values of an object as URI components (e.g., for Next.js `req.query`).

#### Styling utilities
- `shadeColor`: Shades a hex color by a given percentage.
- `invertHexColor`: Returns the inverse of a hex color (e.g., `"#aabbcc"` → `"#554433"`).
- `applyHexColorOpacity`: Applies an opacity factor (0–1) to a hex color, returning an 8-character hex string.

Related types
-------------
**Backend**
- `Bit`: A single bit value used by `CyBuffer`.
- `BenchmarkResult`: The result of a single benchmark run.
- `BenchmarkResults`: A map of benchmark results keyed by function name.
- `CryptoAes256GcmEncryptResult`: The result of an AES-256-GCM encryption call.
- `Endianness`: `"LE"` or `"BE"`.
- `NextApiMethodInput`: Input type for `NextApiWrapper` method handlers.
- `NextAuthApiMethodInput`: Input type for `NextAuthApiWrapper` method handlers.
- `StringEncoding`: Available string encoding options for `CyBuffer` string methods.

**Frontend**
- `CSSDelay`: A CSS delay value, either a number (milliseconds) or a string (`"1s"`, `"500ms"`).

**Main**
- `CGASStatus`: The CGAS status response object.
- `CGASStatusString`: The CGAS status string (`"enabled"`, `"disabled"`, `"in-maintenance"`, `"in-development"`).
- `ErrorObj`: The shape of a Cybearl error object.
- `FailedRequest`: A failed request response containing an error object.
- `NextLoggerInstance`: The type of a logger returned by `createNextLogger` or `withPrefix`.
- `NextLoggerOptions`: Options accepted by each log method (`prefix`, `data`).
- `RequiredEnvVars`: The `{ public, private }` config shape for `checkEnvironmentVariables`.
- `RequestResult<T>`: A discriminated union of `SuccessfulRequest<T>` and `FailedRequest`.
- `SuccessfulRequest<T>`: A successful request response containing typed data.

Dev notes
---------
*N/A*
