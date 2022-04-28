import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import JWTCheck from "../middlewares/JWTCheck";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";
import SlotController from "../controllers/SlotController";
import IRouter from "../types/IRouter";
import BodyValidator from "../middlewares/BodyValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import SlotUpdateBodyValidator from "../validators/Slot/SlotUpdateBodyValidator";

class SlotRouter implements IRouter {

  public path = "/slots";

  public router: Router;

  private slotController = new SlotController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      BodyValidator(SlotCreateBodyValidator),
      this.slotController.create,
    );

    this.router.patch(
      `${this.path}/:id(\\d+)`,
      ParamsValidator(BaseParamsValidator),
      BodyValidator(SlotUpdateBodyValidator),
      this.slotController.updateById,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(BaseParamsValidator),
      this.slotController.deleteById,
    );

  }
}

export default SlotRouter;
