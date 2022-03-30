import { Application } from "express";
import { IRequestHandler } from "../types/IRequestHandler";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

/**
 * Inject logging timestamp for each request
 */
class Http implements IMiddleware {
  private static handler: IRequestHandler = (_req, _res, next) => {
    Log.info(`Time: ${Date.now()}`);
    next();
  };

  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'HTTP'...");
    _express.use(Http.handler);
  }
}

export default Http;
