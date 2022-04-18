import { Router } from "express";
import IRouter from "../types/IRouter";
import RoomController from "../controllers/RoomController";
import BodyValidator from "../middlewares/BodyValidator";
import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";

class RoomRouter implements IRouter {

  public path = "/rooms";

  public router: Router;

  private roomController = new RoomController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.get(
      this.path,
      this.roomController.getAll,
    );

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      BodyValidator(RoomCreateBodyValidator),
      this.roomController.create,
    );

  }

}

export default RoomRouter;
