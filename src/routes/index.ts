import { Router } from "express";
import HomeRouter from "./HomeRouter";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";
import EscapePodRouter from "./EscapePodRouter";
import RoomRouter from "./RoomRouter";
import BookingRouter from "./BookingRouter";
import SlotRouter from "./SlotRouter";



/**
 * Main router for our express application
 */
const router = Router();

router.use((new HomeRouter()).router);
router.use((new UserRouter()).router);
router.use((new AuthRouter()).router);
router.use((new EscapePodRouter()).router);
router.use((new RoomRouter()).router);
router.use((new BookingRouter()).router);
router.use((new SlotRouter()).router);


export default router;
