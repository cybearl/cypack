<p align="center">
  <br />
  <a href="https://www.cybearl.com" target="_blank"><img width="100px" src="https://cybearl.com/_next/image?url=%2Fimages%2Flogo.webp&w=640&q=75" /></a>
  <h2 align="center">@cybearl/cypack</h2>
  <p align="center">The centralized Cybearl application and API service utilities<br />in a single well-optimized package.</p>
</p>

This package includes multiple centralized utilities for the Cybearl application and API service. It is designed to be a single package that can be used in both the client and server side of the application. It is also designed to be well-optimized and well-documented for easy use.

Integration into your project
-----------------------------
### 0. NPM RC file:
This package is **not** published on the NPM registry. To install it, you news to have an `.npmrc` file in your project that
redirect any `@cybearl` package to the GitHub package registry. If you don't have one, create it in the root of your project and add the following line:
```
@cybearl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
always-auth=true
```

### 1. Install the package:
```bash
npm install @cybearl/cypack
```
Or with Yarn:
```bash
yarn add @cybearl/cypack
```

Categories and utilities
------------------------

### Utilities for the Cybearl General API System
- `getCGASStatus`: Returns the current status of the application, or the application marker only if specified,
  in the Cybearl General API System (CGAS) format.

### Benchmark utilities
- `Bench`: A class that provides a simple way to benchmark functions.

### Configuration utilities
- `constants`: Multiple constants used throughout the application (user password length, etc.).

### Error utilities
Contains a set of base error that follows the Cybearl error format, and other error-related utilities.
- `BaseError`: The base error class that all Cybearl errors inherit from.
- `formatErrorResponse`: Formats an error response object.
- `stringifyError`: Stringifies an error object.

### Formatting utilities
Contains a set of utilities to format numbers, time, and other values.
- `formatUnit`: Format a number with an attached unit + an optional time unit.
- `formatHRTime`: Format a high-resolution time, into a responsive string with the en-US locale format.
- `formatTime`: Format a time in milliseconds into a responsive string with the en-US locale format.
- `formatPercentage`: Formats a number as a percentage.

### Host-related utilities
Contains utilities to get the hostname and other host-related information.
- `getHostname`: Get the name of the host on which the application is running.

### JSON utilities
Contains utilities to parse and stringify JSON objects.
- `stringify`: Stringify a JSON object with support for BigInt and functions.

### Logger utilities
Contains a simple multi-level logger that logs to the console based on `Winston`.
- `logger`: A simple multi-level logger that logs to the console based on `Winston`.

### URLs utilities
Contains utilities to manipulate URLs.
- `addParamsToUrl`: Allows to add query parameters to a URL.

### React hooks
Contains a set of React hooks that can be used in React components.
- `useAnimationFrame`: A React hook that runs a callback function on every animation frame.
- `useCanvas`: A React hook that creates a canvas element and provides a 2D rendering context.
- `useInterval`: A React hook that runs a callback function at a specified interval.
- `useMouseCoordinates`: A React hook that provides the current mouse coordinates.

### Related types
- `CGASStatus`: The status of the application.
- `CGASStatusResponse`: The Cybearl General API System (CGAS) status response.
- `BenchmarkResult`: The type of the benchmark function result.
- `BenchmarkResults`: An object containing multiple benchmark results, ordered by functions.
- `ErrorObj`: The type definition for an error object.
- `ErrorObjAdditionalData`: The type definition for additional data that can be attached to an error object.
- `SuccessfulRequest`: The type for a successful request, containing the data of type T.
- `FailedRequest`: The type for a failed request, containing the error message and the error object.
- `RequestResult`: Returns a failed request in case the `success` field is set to `false`,
  otherwise returns a successful request with a data object of type T.
