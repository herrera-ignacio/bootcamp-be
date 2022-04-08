import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
 import AdminAuthorization from "../middlewares/AdminAuthorization";
import JWTCheck from "../middlewares/JWTCheck";
 import OIDCheck from "../middlewares/OIDCheck";
 import AuthCheck from "../middlewares/AuthCheck";



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
       OIDCheck.use(),
       AuthCheck(),
       AdminAuthorization(),
      this.UserController.getById);
    this.router.post(this.path, BodyValidator(UserCreateBodyValidator),
    JWTCheck.use(), OIDCheck.use(), AdminAuthorization(),
      this.UserController.create);
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), BodyValidator(UserUpdateBodyValidator, true),
    JWTCheck.use(), OIDCheck.use(), AdminAuthorization(),
      this.UserController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, 
    JWTCheck.use(), OIDCheck.use(), AdminAuthorization(),
      this.UserController.deleteById);
  }
}

export default UserRouter;