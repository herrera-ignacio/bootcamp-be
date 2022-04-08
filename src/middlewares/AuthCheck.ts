import UserService from "../services/UserService";
import { UserRole } from "../entities/User";
import Log from "../utils/Log";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";



const AuthCheck = ( // eslint-disable-line @typescript-eslint/no-explicit-any
): IRequestHandler  => 
  async (req:any, res, next): Promise<any> => {

    const userService = new UserService(); 

    if(req.auth){
        const user = await userService.getByAuth0_id(req.auth.sub);
        req.auth.userId=user.id;
        next()
    } else {
        next()
    }  
};

export default AuthCheck;