import { Router } from "express";
import IRouter from "../types/IRouter";
import BookingController from "../controllers/BookingController";
import JWTCheck from "../middlewares/JWTCheck";
import Authentication from "../middlewares/Authentication";
import RoleBasedAuthorization from "../middlewares/RoleBasedAuthorization";
import BodyValidator from "../middlewares/getBodyValidator";
import ParamsValidator from "../middlewares/getParamsValidator";
import BookingCreateBodyValidator from "../validators/Booking/BookingCreateBodyValidator";
import BaseParamsValidator from "../validators/BaseParamsValidator";
import { UserRole } from "../entities/User";

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
      RoleBasedAuthorization.use([ UserRole.CONTRACTOR ]),
      BodyValidator(BookingCreateBodyValidator),
      this.bookingController.create,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      Authentication.use(),
      RoleBasedAuthorization.use([ UserRole.CONTRACTOR ]),
      ParamsValidator(BaseParamsValidator),
      this.bookingController.deleteById,
    );
  }
}
export default SlotRouter;
