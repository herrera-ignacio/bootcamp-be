import { Application } from "express";
import Config from "./Config";
import Log from "../utils/Log";
import apiRouter from "../routes";
import IMiddleware from "../types/IMiddleware";

/**
 * Injects routes to express application
 */
class Routes implements IMiddleware {
  public static init(_express: Application): void {
    Log.info("Routes :: Mounting API Routes...");
    const { apiPrefix } = Config.config();
    _express.use(`${apiPrefix}`, apiRouter);
  }
}

export default Routes;
