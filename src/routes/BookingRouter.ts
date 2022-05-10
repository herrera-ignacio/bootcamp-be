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
import ResourceBasedAuthorizationMw from "../middlewares/UserResourceBasedAuthorization";
import Booking from "../entities/Booking";
import BookingService from "../services/BookingService";

class BookingRouter implements IRouter {

  public router: Router;

  public path = "/bookings";

  private bookingController = new BookingController();

  private resourceAuthorizationMw = new ResourceBasedAuthorizationMw<Booking>(new BookingService());

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
      this.resourceAuthorizationMw.use(),
      ParamsValidator(BaseParamsValidator),
      this.bookingController.deleteById,
    );
  }
}
export default BookingRouter;
