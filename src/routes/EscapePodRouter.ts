import { Router } from "express";
import EscapePodController from "../controllers/EscapePodController";
import IRouter from "../types/IRouter";
import BodyValidator from "../middlewares/getBodyValidator";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";
import ParamsValidator from "../middlewares/getParamsValidator";
import EscapePodUpdateParamsValidator from "../validators/EscapePod/EscapePodUpdateParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";


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
      `${this.path}`,
      this.escapePodController.getAll,
    );

    this.router.get(
      `${this.path}/:id(\\d+)`,
      ParamsValidator(BaseParamsValidator),
      this.escapePodController.getById,
    );

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      BodyValidator(EscapePodCreateBodyValidator),
      this.escapePodController.create,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(EscapePodUpdateParamsValidator),
      this.escapePodController.updateById,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(BaseParamsValidator),
      this.escapePodController.deleteById,
    );

  }
}

export default EscapePodRouter;
