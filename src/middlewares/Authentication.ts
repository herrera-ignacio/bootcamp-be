import express, {
  NextFunction,
  Response,
} from "express";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import NotAuthenticatedException from "../exceptions/NotAuthenticatedException";
import UserService from "../services/UserService";
import NotFoundException from "../exceptions/NotFoundException";



export class AuthenticationMiddleware implements IMiddleware {
  protected static initMessage = "AuthenticationMiddleware :: Setup authentication middleware...";

  private readonly userService: UserService;

  constructor(
    msg?: string, userService = new UserService(),
  ) {
    Log.info(msg ?? AuthenticationMiddleware.initMessage);
    this.userService = userService;

  }

  public use(): express.RequestHandler {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {

      /*
      req.auth is populated by JWTCheck Middleware
      and sub is the user id that auth0Id token returns
       */

      if (!req.auth?.sub) throw new NotAuthenticatedException();

      try {

        const user = await this.userService.getByKey(
          "auth0Id", req.auth.sub,
        );

        // Add two more keys to the object auth to use them in the next middleware
        req.auth.isAuthenticated = true;
        req.auth.user = user;

        next();

      } catch (e) {

        if (e instanceof NotFoundException) throw new NotAuthenticatedException();
        next(e);
      }

    };

  }


}

export default new AuthenticationMiddleware();
