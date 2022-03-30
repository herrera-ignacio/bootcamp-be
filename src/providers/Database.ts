import { createConnection, getConnection as getTypeOrmConnection } from "typeorm";
import Log from "../utils/Log";
import Config from "./Config";

/**
 * Handles database connection
 */
class Database {
  public static init(): Promise<void> {
    Log.info("Database :: Connecting...");
    const {
      databasePassword, databaseUser, databaseSynchronize, databaseLogging, databaseHost, databaseName, databasePort,
    } = Config.config();
    return createConnection({
      type: "postgres",
      host: databaseHost,
      port: databasePort,
      username: databaseUser,
      password: databasePassword,
      database: databaseName,
      entities: [
        `${__dirname}/../entities/*.js`,
      ],
      synchronize: databaseSynchronize,
      logging: databaseLogging,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }).then(() => Log.info("Database :: Connected"));
  }

  public static getConnection() {
    return getTypeOrmConnection();
  }
}

export default Database;
