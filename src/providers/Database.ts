import {
  createConnection,
  getConnection as getTypeOrmConnection,
} from "typeorm";
import Log from "../utils/Log";
import Config from "./Config";

/**
 * Handles database connection
 */
class Database {
  public static init(): Promise<void> {
    Log.info("Database :: Connecting...");
    const {
      databaseHost,
      isDatabaseLogging,
      databaseName,
      databasePassword,
      isDatabaseSynchronize,
      databasePort,
      databaseUser,
    } = Config.config();

    return createConnection({
      database: databaseName,
      entities: [
        `${__dirname}/../entities/*.js`,
      ],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      host       : databaseHost,
      logging    : isDatabaseLogging,
      password   : databasePassword,
      port       : databasePort,
      synchronize: isDatabaseSynchronize,
      type       : "postgres",
      username   : databaseUser,

    }).then(() => Log.info("Database :: Connected"));
  }

  public static getConnection() {
    return getTypeOrmConnection();
  }
}

export default Database;
