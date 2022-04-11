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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      databaseLogging,
      databaseName,
      databasePassword,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      databaseSynchronize,
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
      logging    : databaseLogging,
      password   : databasePassword,
      port       : databasePort,
      synchronize: databaseSynchronize,
      type       : "postgres",
      username   : databaseUser,

    }).then(() => Log.info("Database :: Connected"));
  }

  public static getConnection() {
    return getTypeOrmConnection();
  }
}

export default Database;
