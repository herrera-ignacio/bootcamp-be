import {
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import { QueryFailedError } from "typeorm";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { IRequestErrorHandler } from "../types/IRequestErrorHandler";
import HttpException from "../exceptions/HttpException";
import NotAuthenticatedException from "../exceptions/NotAuthenticatedException";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

/**
 * Handle exceptions thrown from controllers/services.
 */
class ClientErrorHandler implements IMiddleware {
  // eslint-disable-next-line max-params
  private static handler: IRequestErrorHandler = (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err) {
      Log.error(err.stack);
      if (err instanceof HttpException) {
        res.status(err.status).json({ errorMessage: err.message });
      } else if (err instanceof QueryFailedError) {
        res.status(400).json({ errorMessage: "Query error, do you know what you are doing?" });
      } else if (err instanceof NotAuthenticatedException || err.status === 401) {
        // We check for err.status because some third-party libraries throw their own exceptions
        res.status(401).json({ errorMessage: "Authentication failed, who are you?" });
      } else if (err instanceof NotAuthorizedException) {
        res.status(403).json({ errorMessage: "You don't have enough permissions!" });
      } else {
        res
          .status(err.status ?? 500)
          .json({ errorMessage: err.message ?? "Something went wrong!" });
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
