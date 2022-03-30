import { Router } from "express";
import HomeController from "../controllers/HomeController";
import IRouter from "../types/IRouter";

/**
 * Routes for root/home path
 */
class HomeRouter implements IRouter {
  public path = "/";

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, HomeController.index);
  }
}

export default HomeRouter;

