<p align="center">
  <br />
  <a href="https://www.cybearl.com" target="_blank"><img width="100px" src="https://cybearl.com/_next/image?url=%2Fimages%2Flogo.webp&w=640&q=75" /></a>
  <h2 align="center">@cybearl/cypack</h2>
  <p align="center">The centralized Cybearl application and API service utilities<br />in a single well-optimized package.</p>
</p>

This package includes multiple centralized utilities for the Cybearl application and API service. It is designed to be a single package that can be used in both the client and server side of the application. It is also designed to be well-optimized and well-documented for easy use.

Integration into your project
-----------------------------
#### 0. Temporary note:
For now, this repository is private and the package is **NOT** deployed to NPM, but to GitHub Packages.
To use this package, you need to have a GitHub account and be a member of the Cybearl organization,
and you need to have a GitHub Personal Access Token with the `read:packages` scope.

Add the following to an `.npmrc` file in your project's root directory:
```
@cybearl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_TOKEN>
always-auth=true
```
And **DO NOT** commit this file to your repository, or at least, load the token from an environment variable.

#### 1. Install the package:
```bash
npm install @cybearl/cypack
```
Or with Yarn:
```bash
yarn add @cybearl/cypack
```

Categories and utilities
------------------------
The utilities are divided into multiple categories, each with its own set of utilities. The categories are as follows:
- **cyCGAS**: Utilities for the Cybearl General API System.
    - `getStatus`: Returns the current status of the application, or the application marker only if specified.
- **cyGeneral**: General utilities for the Cybearl application and API service.
    - `Bench`: A class that provides a simple way to benchmark functions.
    - `constants`: Multiple constants used throughout the application (user password length, etc.).
    - `errors`: Contains a set of base error that follows the Cybearl error format, and other error-related utilities:
        - `BaseError`: The base error class that all Cybearl errors inherit from.
        - `formatErrorResponse`: Formats an error response object.
        - `stringifyError`: Stringifies an error object.
    - `formats`: Used to format different types of data in order to print them or send them to the client.
        - `formatUnit`: Format a number with an attached unit + an optional time unit.
        - `formatHRTime`: Format a high-resolution time, into a responsive string with the en-US locale format.
        - `formatTime`: Format a time in milliseconds into a responsive string with the en-US locale format.
        - `formatPercentage`: Formats a number as a percentage.
    - `host`: Contains utilities related to the host environment.
        - `getHostname`: Get the name of the host on which the application is running.
    - `json`: Contains utilities related to JSON data.
        - `stringify`: Stringify a JSON object with support for BigInt and functions.
    - `logger`: A simple multi-level logger that logs to the console based on `Winston`.
    - `urls`: Contains utilities related to URLs.
        - `addParamsToUrl`: Allows to add query parameters to a URL.
- **cyReact**: Utilities that are React-specific.
    - `useAnimationFrame`: A React hook that runs a callback function on every animation frame.
    - `useCanvas`: A React hook that creates a canvas element and provides a 2D rendering context.
    - `useInterval`: A React hook that runs a callback function at a specified interval.
    - `useMouseCoordinates`: A React hook that provides the current mouse coordinates.

**Related types**:
- `Status`: The status of the application.
- `StatusResponse`: The Cybearl General API System (CGAS) status response.
- `BenchmarkResult`: The type of the benchmark function result.
- `BenchmarkResults`: An object containing multiple benchmark results, ordered by functions.
- `ErrorObj`: The type definition for an error object.
- `ErrorObjAdditionalData`: The type definition for additional data that can be attached to an error object.
- `SuccessfulRequest`: The type for a successful request, containing the data of type T.
- `FailedRequest`: The type for a failed request, containing the error message and the error object.
- `RequestResult`: Returns a failed request in case the `success` field is set to `false`,
  otherwise returns a successful request with a data object of type T.
