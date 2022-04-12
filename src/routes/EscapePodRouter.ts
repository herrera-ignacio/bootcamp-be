import { Router } from "express";
import EscapePodController from "../controllers/EscapePodController";
import IRouter from "../types/IRouter";
import BodyValidator from "../middlewares/BodyValidator";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";

class EscapePodRouter implements IRouter {

  public path = "/escapePods";

  public router: Router;

  private escapePodController = new EscapePodController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();

  }

  initializeRoutes() {
    this.router.post(
      this.path, BodyValidator(EscapePodCreateBodyValidator), this.escapePodController.create,
    );
  }
}

export default EscapePodRouter;
