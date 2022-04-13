import { Router } from "express";
import HomeRouter from "./HomeRouter";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";
import EscapePodRouter from "./EscapePodRouter";

/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);
router.use((new UserRouter()).router);
router.use((new AuthRouter()).router);
router.use((new EscapePodRouter()).router);

export default router;
