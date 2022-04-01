import { Router } from "express";
// import AuthController from "../controllers/AuthController";
import IRouter from "../types/IRouter";
// eslint-disable-next-line import/no-named-as-default
import JWTCheck from "../middlewares/JWTCheck";
import OIDCheck from "../middlewares/OIDCheck";

/**
 * Routes for root/home path
 */
class AuthRouter implements IRouter {
  public path = "/auth";

  public router: Router;

  // private authController = new AuthController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * Validate OAuth2 Bearer Token Authentication,
     * and persist user if first login.
     */
    this.router.post(`${this.path}/onSuccess`, JWTCheck.use(), OIDCheck.use(), (req, res)=>{res.status(200).json({ data: "success" });});
  }
}

export default AuthRouter;