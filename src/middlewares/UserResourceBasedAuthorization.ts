import {
  NextFunction,
  Response,
} from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import User, { UserRole } from "../entities/User";
import { IService } from "../types/IService";

export class UserResourceBasedAuthorization<T> implements IMiddleware {
  protected static initMessage = `ResourceBasedAuthorization :: Setup role-based authorization middleware...`;

  private readonly entityService: IService<T>;


  constructor(
    entityService: IService<T>,
    msg?: string,
  ) {
    Log.info(msg ?? UserResourceBasedAuthorization.initMessage);
    this.entityService =  entityService;
  }

  /**
   * Will allow request go through if admin
   * or if user owns given resource
   * (works for resources that have a many-to-one relationship with users)
   */
  public use() {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {
      const entityId = Number(req.params.id);

      const {
        id: userId,
        role: userRole,
      } =  req.auth.user;

      // Bypass if Admin
      if (userRole === UserRole.ADMIN) {
        next();
      } else {
        const entity = await this.entityService.getById(
          entityId, true,
        ) as T & { user: User };

        const owner = entity.user.id;

        // Validate ownership of resource
        if (owner === userId) {
          next();
        } else {
          throw new NotAuthorizedException();
        }
      }
    };
  }

}

export default UserResourceBasedAuthorization;
