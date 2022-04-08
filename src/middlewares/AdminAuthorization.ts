import UserService from "../services/UserService";
import { UserRole } from "../entities/User";
import Log from "../utils/Log";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";



const AdminAuthorization = ( // eslint-disable-line @typescript-eslint/no-explicit-any
): IRequestHandler  => 
  async (req:any, res, next): Promise<any> => {

    const userService = new UserService(); 

    if (req.auth && req.auth.sub) {
      const user = await userService.getById(req.auth.userId);
      if (user.role === UserRole.ADMIN) {
        Log.info(JSON.stringify(user));
        next();
      } else {
        Log.info(user.role);
        next(new HttpException(403, "Forbidden"));
      }
      
    }
  
  };

export default AdminAuthorization;

