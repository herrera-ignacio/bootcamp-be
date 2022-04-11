import { Request } from "express";
import jwt from "express-jwt";
import { JWTCheckMiddleware } from "./JWTCheck";
import Config from "../providers/Config";

/**
 * Authentication middleware for id_token
 * Extract JWT from the X-OIDC header as an JWT
 * It will populate req.user
 */
export class OIDCheckMiddleware extends JWTCheckMiddleware {
  protected static initMessage = "OIDCheck :: Mounting X-OIDC JWT validator...";

  constructor() {
    super(OIDCheckMiddleware.initMessage);
  }

  public getOptions(): jwt.Options {
    const baseOptions = JWTCheckMiddleware.prototype.getOptions.call(this);

    console.log(baseOptions);
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
