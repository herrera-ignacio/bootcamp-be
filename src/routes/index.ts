import { Router } from "express";
import HomeRouter from "./HomeRouter";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";
import EscapePodRouter from "./EscapePodRouter";
import RoomRouter from "./RoomRouter";


/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);
router.use((new UserRouter()).getRoutes());
router.use((new AuthRouter()).router);
router.use((new EscapePodRouter()).router);
router.use((new RoomRouter()).router);

export default router;
