/* eslint-disable class-methods-use-this */
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import Config from "../providers/Config";

/**
 * Authentication middleware JWT-based
 * Default behavior:
 * Extract access_token from the "Authorization" header
 * as an OAuth2 Bearer Token
 * and populate req.auth
 */
export class JWTCheckMiddleware implements IMiddleware {
  protected static initMessage = "JWTCheck :: Mounting OAuth2 Bearer Token validator...";

  private handler: jwt.RequestHandler;

  constructor(msg?: string) {
    Log.info(msg ?? JWTCheckMiddleware.initMessage);
  }

  public getOptions(): jwt.Options {
    const {
      auth0ServerAudience,
      auth0jwksUri,
      auth0Issuer,
    } = Config.config();

    return {
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: auth0jwksUri,
      }),
      audience: auth0ServerAudience,
      issuer: auth0Issuer,
      algorithms: [ "RS256" ],
      requestProperty: "auth",
    };
  }

  public use() {
    if (this.handler) return this.handler;
    this.handler = jwt(this.getOptions());
    return this.handler;
  }
}

export default new JWTCheckMiddleware();
