import {
  Application, NextFunction, Request, Response,
} from "express";
import { QueryFailedError } from "typeorm";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { IRequestErrorHandler } from "../types/IRequestErrorHandler";
import HttpException from "../exceptions/HttpException";

/**
 * Handle exceptions thrown from controllers/services.
 */
class ClientErrorHandler implements IMiddleware {
  private static handler: IRequestErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      Log.error(err.message);
      if (err instanceof HttpException) {
        res.status(err.status).json({ errorMessage: err.message });
      } else if (err instanceof QueryFailedError) {
        res.status(400).json( { errorMessage: "Query error!" });
      } else {
        res.status(500).json({ errorMessage: "Something went wrong!" });
      }
    } else {
      next(err);
    }
  };

  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'ClientErrorHandler'");
    _express.use(ClientErrorHandler.handler);
  }
}

export default ClientErrorHandler;
