import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter{
    
  public path = "/users";

  public router: Router;

  private UserController = new UserController();

  constructor(){
    this.router = Router();
    this.initializeRoutes();

  }

  initializeRoutes() {
    this.router.get(this.path, null, this.UserController.getAll);
    this.router.post(this.path, this.UserController.create);
  }
}

export default UserRouter;