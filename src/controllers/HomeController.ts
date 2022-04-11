import {
  Response,
  Request,
} from "express";
import Config from "../providers/Config";

/**
 * Handle HTTP requests for Home/Route path
 */
class HomeController {
  public static index(
    _req: Request, res: Response,
  ) {
    return res.json({
      description: Config.config().appDescription,
      name       : Config.config().appName,
    });
  }
}

export default HomeController;
