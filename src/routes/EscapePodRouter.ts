import { Router } from "express";
import EscapePodController from "../controllers/EscapePodController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import EscapePodUpdateBodyValidator from "../validators/EscapePod/EscapePodUpdateBodyValidator";
import EscapePodUpdateParamsValidator from "../validators/EscapePod/EscapePodUpdateParamsValidator";
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
    this.router.get(
      this.path, this.escapePodController.getAll,
    );
    this.router.get(
      `${this.path}/:id(\\d+)`, ParamsValidator(BaseParamsValidator), this.escapePodController.getById,
    );
    this.router.post(
      this.path, BodyValidator(EscapePodCreateBodyValidator), this.escapePodController.create,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`, ParamsValidator(EscapePodUpdateParamsValidator), BodyValidator(
        EscapePodUpdateBodyValidator, true,
      ), this.escapePodController.updateById,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`, this.escapePodController.deleteById,
    );
  }
}

export default EscapePodRouter;
