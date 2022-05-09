import {
  NextFunction,
  Response,
} from "express";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import UserService from "../services/UserService";
import { UserRole } from "../entities/User";

export class AuthorizationMiddleware implements IMiddleware {
  protected static initMessage = "AuthorizationMiddleware :: Setup authorization middleware...";

  private readonly userService: UserService;


  constructor(
    msg?: string, userService =  new UserService(),
  ) {

    Log.info(msg ?? AuthorizationMiddleware.initMessage);
    this.userService =  userService;

  }


  public use(allowedRoles?: UserRole[]) {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {

      const userRole =  req.auth.user?.role;

      if (userRole === UserRole.ADMIN || allowedRoles?.includes(userRole)) {
        next();
      } else {
        throw new NotAuthorizedException();
      }

    };
  }

}

export default new AuthorizationMiddleware();
