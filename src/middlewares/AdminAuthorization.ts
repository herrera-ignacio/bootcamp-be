import { Request } from "express";
import UserService from "../services/UserService";
import User, { UserRole } from "../entities/User";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";



const AdminAuthorization = (
): IRequestHandler  => 
  async (req:Request, res, next): Promise<User> => {

    // Given 
    let user;
    const userService = new UserService(); 
   
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

export default AdminAuthorization;

