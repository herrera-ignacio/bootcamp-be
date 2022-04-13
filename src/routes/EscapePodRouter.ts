import { Router } from "express";
import EscapePodController from "../controllers/EscapePodController";
import IRouter from "../types/IRouter";
import BodyValidator from "../middlewares/BodyValidator";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import EscapePodUpdateParamsValidator from "../validators/EscapePod/EscapePodUpdateParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";


class EscapePodRouter implements IRouter {

  public path = "/escapePods";

  public router: Router;

  private escapePodController = new EscapePodController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();

  }

  initializeRoutes() {


    this.router.get(
      `${this.path}/:id(\\d+)`,
      ParamsValidator(BaseParamsValidator),
      this.escapePodController.getById,
    );

    this.router.post(
      this.path, BodyValidator(EscapePodCreateBodyValidator), this.escapePodController.create,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`,
      ParamsValidator(EscapePodUpdateParamsValidator),

      this.escapePodController.updateById,
    );

    this.router.post(
      this.path, BodyValidator(EscapePodCreateBodyValidator), this.escapePodController.create,

  }
}

export default EscapePodRouter;
