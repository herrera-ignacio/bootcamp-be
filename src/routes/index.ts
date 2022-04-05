import { Router } from "express";
import HomeRouter from "./HomeRouter";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";

/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);
router.use((new UserRouter()).router);
router.use((new AuthRouter()).router);

export default router;
