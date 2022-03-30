import { Application } from "express";
import cors from "cors";
import Log from "../utils/Log";
import Config from "../providers/Config";
import IMiddleware from "../types/IMiddleware";

/**
 * Handle CORS settings
 */
class CORS implements IMiddleware {
  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'CORS'...");

    _express.use(cors(
      {
        origin: Config.config().appURL,
        allowedHeaders: [ "Authorization", "Content-Type", "x-oidc" ],
      },
    ));
  }
}

export default CORS;
