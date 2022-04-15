import { Router } from "express";
import IRouter from "../types/IRouter";
import RoomController from "../controllers/RoomController";
import BodyValidator from "../middlewares/BodyValidator";
import RoomCreateBodyValidator from "../validators/Room/RoomCreateBodyValidator";

class RoomRouter implements IRouter {

  public path = "/rooms";

  public router: Router;

  private roomController = new RoomController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.post(
      this.path,
      BodyValidator(RoomCreateBodyValidator),
      this.roomController.create,
    );

  }

}

export default RoomRouter;
