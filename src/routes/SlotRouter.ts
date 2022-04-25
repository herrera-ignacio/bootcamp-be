import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import JWTCheck from "../middlewares/JWTCheck";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";
import SlotController from "../controllers/SlotController";
import IRouter from "../types/IRouter";
import BodyValidator from "../middlewares/BodyValidator";

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
  }
}

export default SlotRouter;
