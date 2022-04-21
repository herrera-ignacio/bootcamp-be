import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import getParamsValidator from "../middlewares/getParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import getBodyValidator from "../middlewares/getBodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import authentication  from "../middlewares/Authentication";
import authorization from "../middlewares/Authorization";
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
    this.initializeMiddlewares();
  }

  getRoutes() {
    this.initializeRoutes();
    return this.router;
  }

  initializeMiddlewares() {
    this.router.use(JWTCheck.use());
    this.router.use(authentication.use());
  }

  initializeRoutes() {
    this.router.get(
      this.path, this.userController.getAll,
    );

    this.setGetByIdRoute();

    this.router.post(
      this.path,
      authorization.use(),
      UserRouter.bodyValidator(UserCreateBodyValidator),
      this.userController.create,
    );

    this.router.patch(
      `${this.path}/:id(\\d+)`,
      authorization.use(),
      UserRouter.paramsValidator(UserUpdateParamsValidator),
      UserRouter.bodyValidator(
        UserUpdateBodyValidator, true,
      ),
      this.userController.updateById,
    );


    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authorization.use(),
      this.userController.deleteById,
    );
  }

  setGetByIdRoute() {
    this.router.get(
      `${this.path}/:id(\\d+)`,
      UserRouter.paramsValidator(BaseParamsValidator),
      this.userController.getById,
    );
  }
}

export default UserRouter;
