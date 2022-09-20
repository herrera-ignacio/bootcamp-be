import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import getParamsValidator from "../middlewares/getParamsValidator";
import getBodyValidator from "../middlewares/getBodyValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import Authentication  from "../middlewares/Authentication";
import RoleBasedAuthorization from "../middlewares/RoleBasedAuthorization";
import JWTCheck from "../middlewares/JWTCheck";



class UserRouter implements IRouter {

  public path = "/users";

  public router: Router;

  static paramsValidator = getParamsValidator;

  static bodyValidator = getBodyValidator;

  private userController = new UserController();

  constructor(userController: UserController = new UserController()) {
    this.router = Router();
    this.userController = userController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use(),
      this.userController.getAll,
    );

    this.router.get(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use(), // TODO: Also allow self
      UserRouter.paramsValidator(BaseParamsValidator),
      this.userController.getById,
    );

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use(),
      UserRouter.bodyValidator(UserCreateBodyValidator),
      this.userController.create,
    );

    this.router.patch(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use(), // TODO: Also allow self
      UserRouter.paramsValidator(UserUpdateParamsValidator),
      UserRouter.bodyValidator(
        UserUpdateBodyValidator, true,
      ),
      this.userController.updateById,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use(),
      this.userController.deleteById,
    );
  }
}

export default UserRouter;
