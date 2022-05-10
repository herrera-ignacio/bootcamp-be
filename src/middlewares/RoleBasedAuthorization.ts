import {
  NextFunction,
  Response,
} from "express";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import { UserRole } from "../entities/User";

export class AuthorizationMiddleware implements IMiddleware {
  protected static initMessage = "AuthorizationMiddleware :: Setup authorization middleware...";

  constructor(msg?: string) {
    Log.info(msg ?? AuthorizationMiddleware.initMessage);
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
