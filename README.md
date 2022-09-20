# Escape Pods API

## Setup

### Run Backend

1. `yarn install`.
2. Download `.env` file from drive's folder and place in project root (see [.env.base](.env.base) as an example).
3. Run with `yarn dev`.

### Run demo frontend

1. `cd frontend`.
2. `yarn install`.
3. Download `auth_config.json` file from drive's folder and place in `src` folder.
4. Run with either `exec.sh`, `exec.ps1` or just `yarn start`.

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

## TODO

1. Get Bookings by user ID.
2. Join Bookings with User.
3. User can self-update.
4. User can self-get.
