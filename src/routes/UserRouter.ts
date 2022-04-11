import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";

class UserRouter implements IRouter {

  public path = "/users";

  public router: Router;

  private userController = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();

  }

  initializeRoutes() {
    this.router.get(
      this.path, this.userController.getAll,
    );
    this.router.get(
      `${this.path}/:id(\\d+)`, ParamsValidator(BaseParamsValidator), this.userController.getById,
    );
    this.router.post(
      this.path, BodyValidator(UserCreateBodyValidator), this.userController.create,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), BodyValidator(
        UserUpdateBodyValidator, true,
      ), this.userController.updateById,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`, this.userController.deleteById,
    );
  }
}

export default UserRouter;
