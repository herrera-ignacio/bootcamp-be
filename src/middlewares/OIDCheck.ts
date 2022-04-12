import { Request } from "express";
import jwt from "express-jwt";
import { JWTCheckMiddleware } from "./JWTCheck";
import Config from "../providers/Config";

/**
 * Authentication middleware for id_token
 * Extract JWT from the X-OIDC header as an JWT
 * It will populate req.user
 * This should only be used during user sign up; X-OIDC is an application token
 * that will not be present in most requests.
 */
class OIDCheckMiddleware extends JWTCheckMiddleware {
  protected static initMessage = "OIDCheck :: Mounting X-OIDC JWT validator...";

  constructor() {
    super(OIDCheckMiddleware.initMessage);
  }

  public getOptions(): jwt.Options {
    const baseOptions = JWTCheckMiddleware.prototype.getOptions.call(this);
    const { auth0ClientAudience } = Config.config();

    return {
      ...baseOptions,
      audience: auth0ClientAudience,
      getToken: (req: Request) =>
        req.headers["x-oidc"]
      ,
      requestProperty: "user",
    };
  }
}

export default new OIDCheckMiddleware();
