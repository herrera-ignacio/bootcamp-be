import { Router } from "express";
import IRouter from "../types/IRouter";
import SlotController from "../controllers/SlotController";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import { UserRole } from "../entities/User";



class SlotRouter implements IRouter {

  public router: Router;

  public path = "/slot";

  private slotController = new SlotController();

  constructor() {

    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use([ UserRole.CONTRACTOR ]),
      this.slotController.create,
    );
  }
}
export default SlotRouter;
