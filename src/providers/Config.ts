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
  shouldDatabaseSynchronize: boolean;
  shouldDatabaseLog: boolean;
  auth0ServerAudience: string;
  auth0ClientAudience: string;
  auth0Issuer: string;
  auth0jwksUri: string;
};

/**
 * Handles injecting environment configuration & secrets
 */
export default class Config implements IMiddleware {
  private static appConfig: AppConfig;

  /**
   * Expose env configs
   */
  public static config(): AppConfig {
    if (!Config.appConfig) {
      dotenv.config({
        path: path.join(
          __dirname, "../../.env",
        ),
      });

      Config.appConfig = {
        apiPrefix     : process.env.API_PREFIX || "",
        appDescription: process.env.APP_DESCRIPTION
          || "API for Agile Engine employees to make reservations",
        appName            : process.env.APP_NAME || "Uncharted-scape-pods",
        appURL             : process.env.APP_URL || "localhost",
        auth0ClientAudience: process.env.AUTH0_CLIENT_AUDIENCE,
        auth0Issuer        : process.env.AUTH0_ISSUER,
        auth0jwksUri       : process.env.AUTH0_JWKS_URI,
        auth0ServerAudience: process.env.AUTH0_SERVER_AUDIENCE,
        databaseHost       : process.env.DATABASE_HOST || "localhost",
        databaseName       : process.env.DATABASE_NAME || "mydb",
        databasePassword   : process.env.DATABASE_PASSWORD || "postgres",
        databasePort       : !Number.isNaN(Number(process.env.DATABASE_PORT))
          ? Number(process.env.DATABASE_PORT)
          : 5432,
        databaseUser : process.env.DATABASE_USERNAME || "postgres",
        isCORSEnabled: Boolean(process.env.CORS_ENABLED),
        port         : !Number.isNaN(Number(process.env.PORT))
          ? Number(process.env.PORT)
          : 4000,
        shouldDatabaseLog        : process.env.DATABASE_LOGGING?.toLowerCase() === "true",
        shouldDatabaseSynchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
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
