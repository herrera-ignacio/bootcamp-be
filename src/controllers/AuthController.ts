import {
  NextFunction,
  Response,
} from "express";
import UserController from "./UserController";
import { UserMapper } from "../mappers/UserMapper";
import UserService from "../services/UserService";
import NotFoundException from "../exceptions/NotFoundException";
import {
  RequestWithOIDC,
  RequestWithAuth,
} from "../types/Auth/RequestWithUser";
import User, { UserRole } from "../entities/User";



class AuthController extends UserController {

  constructor(
    userService: UserService = new UserService(),
    userMapper: UserMapper = new UserMapper(),

  ) {
    super(
      userService, userMapper,
    );
  }

  public onSuccess = async  (
    req: RequestWithOIDC & RequestWithAuth,
    res: Response,
    next: NextFunction,
  ) => {
    let user: User;

    try {
      user = await this.userService.getByKey(
        "auth0Id", req.auth.sub,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        const { email } = req.user;

        user = await this.userService.create({
          auth0Id: req.auth.sub,
          email,
          role   : UserRole.CONTRACTOR,
        });
      } else {
        next(error);
      }
    }

    res.status(200).json({ data: this.userMapper.toDto(user) });

  };
}

export default AuthController;
