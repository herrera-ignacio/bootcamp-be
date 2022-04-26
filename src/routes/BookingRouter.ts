import { Router } from "express";
import IRouter from "../types/IRouter";
import BookingController from "../controllers/BookingController";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import Authorization from "../middlewares/Authorization";
import { UserRole } from "../entities/User";
import BodyValidator from "../middlewares/BodyValidator";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";



class SlotRouter implements IRouter {

  public router: Router;

  public path = "/bookings";

  private bookingController = new BookingController();

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
      BodyValidator(BookingCreateBodyValidator),
      this.bookingController.create,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      Authorization.use(),
      ParamsValidator(BaseParamsValidator),
      this.bookingController.deleteById,
    );
  }
}
export default SlotRouter;
