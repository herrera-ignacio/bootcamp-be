import {
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

  public use() {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {

      if (!req.auth?.sub) throw new NotAuthenticatedException();

      try {
        const user = await this.userService.getByKey(
          "auth0_id", req.auth.sub,
        );

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
