import Log from "../utils/Log";
import Express from "./Express";

/**
 * Main Application - entry point
 */
class App {
  /**
   * Run server in current worker thread
   */
  public static loadServer(): void {
    Log.info("Server :: Booting @ Master...");
    Express.init();
  }

  /**
   * Initialize new worker from cluster.fork
   */
  public static loadWorker(): void {
    Log.info("Worker :: Booting @ Master...");
  }
}

export default App;
