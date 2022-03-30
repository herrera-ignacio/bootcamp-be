import { Router } from "express";
import HomeRouter from "./HomeRouter";
<<<<<<< HEAD

=======
>>>>>>> 6151542b52ac2531594cc1b8d974c5a71f14a372

/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);

export default router;
