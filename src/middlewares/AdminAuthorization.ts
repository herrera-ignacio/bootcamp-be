import UserService from "../services/UserService";
import { UserRole } from "../entities/User";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";



const AdminAuthorization = ( // eslint-disable-line @typescript-eslint/no-explicit-any
): IRequestHandler  => 
  async (req:any, res, next): Promise<any> => {

    const userService = new UserService(); 

    if (req) {
      const user = await userService.getByEmail(req.user.email);
      if (user.role === UserRole.ADMIN) {
        next();
      } else {
        next(new HttpException(403, "Forbidden"));
      }
      
    }
  
  };

export default AdminAuthorization;

