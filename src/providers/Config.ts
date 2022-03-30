import * as path from "path";
import * as dotenv from "dotenv";
import { Application } from "express";
import IMiddleware from "../types/IMiddleware";
import Log from "../utils/Log";

type AppConfig = {
  appName: string;
  appDescription: string;
  port: number;
  isCORSEnabled: boolean;
  appURL: string;
  apiPrefix: string;
  databaseUser: string;
  databasePassword: string;
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseSynchronize: boolean;
  databaseLogging: boolean;
  auth0ServerAudience: string;
  auth0ClientAudience: string;
  auth0Issuer: string;
  auth0jwksUri: string;
};

/**
 * Handles injecting environment configuration & secrets
 */
class Config implements IMiddleware {
  private static appConfig: AppConfig;

  /**
   * Expose env configs
   */
  public static config(): AppConfig {
    if (!Config.appConfig) {
      dotenv.config({ path: path.join(__dirname, "../../.env") });
      Config.appConfig = {
        appName: process.env.APP_NAME || "Uncharted-scape-pods",
        appDescription: process.env.APP_DESCRIPTION || "API for Agile Engine employees to make reservations",
        port: !Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 4000,
        isCORSEnabled: Boolean(process.env.CORS_ENABLED),
        appURL: process.env.APP_URL || "localhost",
        apiPrefix: process.env.API_PREFIX || "",
        databaseUser: process.env.DATABASE_USERNAME || "postgres",
        databasePassword: process.env.DATABASE_PASSWORD || "postgres",
        databaseHost: process.env.DATABASE_HOST || "localhost",
        databasePort: !Number.isNaN(Number(process.env.DATABASE_PORT)) ? Number(process.env.DATABASE_PORT) : 5432,
        databaseName: process.env.DATABASE_NAME || "mydb",
        databaseLogging: process.env.DATABASE_LOGGING?.toLowerCase() === "true",
        databaseSynchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
        auth0ServerAudience: process.env.AUTH0_SERVER_AUDIENCE,
        auth0ClientAudience: process.env.AUTH0_CLIENT_AUDIENCE,
        auth0Issuer: process.env.AUTH0_ISSUER,
        auth0jwksUri: process.env.AUTH0_JWKS_URI,
      };
    }

    return Config.appConfig;
  }

  /**
   * Initializes dotenv and injects your config into the app's locals
   * @param _express
   */
  public static init(_express: Application) {
    Log.info("Config :: Mounting config middleware");
    _express.locals.app = this.config();
  }
}

export default Config;
