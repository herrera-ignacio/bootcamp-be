import express from "express";
import Daemon from "../middlewares/Daemon";
import Log from "../utils/Log";
import Config from "./Config";
import Routes from "./Routes";
import ErrorHandler from "../middlewares/ErrorHandler";

/**
 * Express Factory
 */
class Express {
  /**
   * Create the express object
   */
  public express: express.Application;

  /**
   * Initializes the express object
   */
  constructor() {
    this.express = express();
    this.mountLocalConfig();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrorHandling();
  }

  /**
   * Mount environment config
   * @private
   */
  private mountLocalConfig(): void {
    Config.init(this.express);
  }

  /**
   * Mount defined middlewares
   * @private
   */
  private mountMiddlewares() {
    Daemon.mount(this.express);
  }

  /**
   * Mount API routes
   * @private
   */
  private mountRoutes(): void {
    Routes.init(this.express);
  }

  /**
   * Mount error handling
   */
  private mountErrorHandling() {
    ErrorHandler.mount(this.express);
  }

  /**
   * Start the express server
   */
  public init(): void {
    const { port } = Config.config();

    this.express.listen(
      port, () => {
      // eslint-disable-next-line no-console
        Log.info(`⚡️[server]: Server is running at localhost:${port}`);
      },
    ).on(
      "error", (_error) => {
        Log.error(_error.message);
      },
    );
  }
}

export default new Express();
