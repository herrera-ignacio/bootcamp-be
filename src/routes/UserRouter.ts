import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import JWTCheck from "../middlewares/JWTCheck";
import { UserRole } from "../entities/User";



class UserRouter implements IRouter{
    
  public path = "/users";

  public router: Router;

  private UserController = new UserController();

  constructor(){
    this.router = Router();
    this.initializeRoutes();

  }

  initializeRoutes() {
    this.router.get(this.path, this.UserController.getAll);
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(BaseParamsValidator),
      JWTCheck.use(),
      AuthorizationMiddleware([ UserRole.ADMIN, UserRole.CONTRACTOR ]),
      this.UserController.getById);
    this.router.post(this.path, BodyValidator(UserCreateBodyValidator),
      JWTCheck.use(), AuthorizationMiddleware([ UserRole.ADMIN ]),
      this.UserController.create);
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), BodyValidator(UserUpdateBodyValidator, true),
      JWTCheck.use(), AuthorizationMiddleware([ UserRole.ADMIN ]),
      this.UserController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, 
      JWTCheck.use(), AuthorizationMiddleware([ UserRole.ADMIN ]),
      this.UserController.deleteById);
  }
}

export default UserRouter;