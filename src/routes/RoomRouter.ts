import { Router } from "express";
import IRouter from "../types/IRouter";
import RoomController from "../controllers/RoomController";
import BodyValidator from "../middlewares/BodyValidator";
import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import paramsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";

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
      `${this.path}/:id(\\d+)`,
      paramsValidator(BaseParamsValidator),
      this.roomController.getById,
    );

    this.router.post(
      this.path,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      BodyValidator(RoomCreateBodyValidator),
      this.roomController.create,
    );

    this.router.patch(
      `${this.path}/:id(\\d+)`,
      this.roomController.updateById,
    );

  }

}

export default RoomRouter;
