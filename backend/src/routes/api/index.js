import express from "express";

const router = express.Router();

import roomRoutes from "./room";
router.use("/room", roomRoutes);

export default router;
