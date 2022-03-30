import { Application, Request, Response } from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

/**
 * Handle not found routes
 */
class NotFoundHandler implements IMiddleware {
  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'NotFoundHandler'");
    _express.use("*", (req: Request, res: Response) => {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const errorMessage = `Path ${req.originalUrl} not found`;

      Log.error(`${errorMessage} [IP: ${ip}]`);

      res.status(404).json({ errorMessage });
    });
  }
}

export default NotFoundHandler;
