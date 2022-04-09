import UserService from "../services/UserService";
import User, { UserRole } from "../entities/User";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";
import { IAuthorizedRequest } from "../types/IAuthorizedRequest";



const AuthorizationMiddleware = ( allowedRoles: UserRole[],
): IRequestHandler  => 
  async (req: IAuthorizedRequest, res, next): Promise<User> => {

    // Given 
    const userService = new UserService(); 
    // Validate
    const user = await userService.getByAuth0_id(req.auth.sub);
    if (allowedRoles.includes(user.role)) {
      next();
    } else {
      next(new HttpException(403, "Forbidden"));
    }
      
    return user;
  };

export default AuthorizationMiddleware;

