import { NextFunction } from "express";
import UserService from "../services/UserService";
import { UserRole } from "../entities/User";
import Log from "../utils/Log";
import HttpException from "../exceptions/HttpException";



const AdminAuthorization = () => async (req: any, res:Response, next: NextFunction): Promise<any> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    

  const userService = new UserService(); 

  if (req) {
    Log.info(req.user);
    const user = await userService.getByEmail(req.user.email);
    if (user.role === UserRole.ADMIN) {
      Log.info(JSON.stringify(user));
      next();
    } else {
      console.log(user.role);
      next(new HttpException(403, "Forbidden"));
    }
    
  }

};

export default AdminAuthorization;

