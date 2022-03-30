import { Router } from "express";
import HomeRouter from "./HomeRouter";


/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);

export default router;
