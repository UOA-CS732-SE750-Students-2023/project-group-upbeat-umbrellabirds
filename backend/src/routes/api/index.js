import express from "express";

const router = express.Router();

import roomRoutes from "./room";
import playerRoutes from "./player";

router.use("/room", roomRoutes);
router.use("/player", playerRoutes);

export default router;
