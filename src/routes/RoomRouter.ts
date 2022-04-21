import { Router } from "express";
import IRouter from "../types/IRouter";
import RoomController from "../controllers/RoomController";
import BodyValidator from "../middlewares/getBodyValidator";
import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import ParamsValidator from "../middlewares/getParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import RoomUpdateBodyValidator from "../validators/Room/RoomUpdateBodyValidator";

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

    this.router.get(
      `${this.path}/:id(\\d+)`,
      ParamsValidator(BaseParamsValidator),
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
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(BaseParamsValidator),
      BodyValidator(RoomUpdateBodyValidator),
      this.roomController.updateById,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(BaseParamsValidator),
      this.roomController.deleteById,
    );

  }

}

export default RoomRouter;
