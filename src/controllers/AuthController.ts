import { NextFunction,  Response } from "express";
import UserController from "./UserController";
import { UserMapper } from "../mappers/UserMapper";
import UserService from "../services/UserService";
import NotFoundException from "../exceptions/NotFoundException";
import { RequestWithOIDC, RequestWithAuth } from "../types/Auth/RequestWithUser";
import User, { UserRole } from "../entities/User";



class AuthController extends UserController{

  constructor(
    userService: UserService = new UserService(),
    userMapper: UserMapper = new UserMapper(),

  ){
    super(userService, userMapper);
  }

  public onSuccess = async  (req:RequestWithOIDC & RequestWithAuth, res:Response, next:NextFunction ) => {
    console.log(req);
    let user:User;

    try {
      user = await this.userService.getByEmail(req.user.email);
    } catch (error) {
      if (error instanceof NotFoundException){
        const { email } = req.user;
        user = await this.userService.create({ email, role: UserRole.CONTRACTOR, id:0 });
      } else {
        next(error);
      }
    }

    res.status(200).json({ data: this.userMapper.toDto(user) });

  };
}

export default AuthController;