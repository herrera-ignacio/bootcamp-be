import UserService from "../services/UserService";
import User, { UserRole } from "../entities/User";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";
import { IAuthorizedRequest } from "../types/IAuthorizedRequest";



const AuthorizationMiddleware = (
): IRequestHandler  => 
  async (req: IAuthorizedRequest, res, next): Promise<User> => {

    // Given 
    let user;
    const userService = new UserService(); 

    // Validate
    console.log(req.auth);
    if (req.auth && req.auth.sub) {
      user = await userService.getByAuth0_id(req.auth.sub);
      if (user.role === UserRole.ADMIN) {
        next();
      } else {
        next(new HttpException(403, "Forbidden"));
      }
      
    }


    return user;
  };

export default AuthorizationMiddleware;

