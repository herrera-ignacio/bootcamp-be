# Escape Pods API

## Setup

1. Install dependencies: `yarn install`.
2. Configure prettier ([see docs](https://prettier.io/docs/en/editors.html))
3. Download `.env` file from drive's folder and place in project root (see [.env.base](.env.base) as an example).
4. Run with `yarn dev`.

## Project Structure

* `src`
  * `controllers`: Express HTTP Handlers.
  * `entities`: Models and DTOs.
  * `middlewares`: Express middlewares implementations.
  * `providers`: Encapsulate implementation providers.
  * `repositories`: Encapsulate data mapping using repositories pattern.
  * `routes`: API public routes.
  * `services`: Business rules and use cases using entities.
  * `types`: Shared interfaces for reusable code.
  * `utils`: Utility functions.
  * `validators`: Class validators for parsing request parameters.
