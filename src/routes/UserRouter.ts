import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import CreateBodyValidator from "../validators/CreateBodyValidator";

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
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(BaseParamsValidator), this.UserController.getById);
    this.router.post(this.path, BodyValidator(CreateBodyValidator), this.UserController.create);
  }
}

export default UserRouter;