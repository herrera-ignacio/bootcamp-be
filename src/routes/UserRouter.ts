import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";

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
    this.router.get(`${this.path}/:id(\\d+)`, this.UserController.getById);
    this.router.post(this.path, this.UserController.create);
  }
}

export default UserRouter;