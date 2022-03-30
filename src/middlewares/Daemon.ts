import { Application, json } from "express";
import Config from "../providers/Config";
import CORS from "./CORS";
import Http from "./Http";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

/**
 * Mount core middlewares
 */
class Daemon implements IMiddleware {
  public static mount = (_express: Application) => {
    Log.info("Daemon :: Mounting Daemon...");

    if (Config.config().isCORSEnabled) {
      CORS.mount(_express);
    }

    _express.use(json());

    Http.mount(_express);
  };
}

export default Daemon;
