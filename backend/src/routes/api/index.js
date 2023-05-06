import express from "express";

const router = express.Router();

import roomRoutes from "./room";
import playerRoutes from "./player";
import gameRoutes from "./game";

router.use("/room", roomRoutes);
router.use("/player", playerRoutes);
router.use("/game", gameRoutes);
export default router;
