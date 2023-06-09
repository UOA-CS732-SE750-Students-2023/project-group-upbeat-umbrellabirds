import express from "express";

const router = express.Router();

import roomRoutes from "./room";
import playerRoutes from "./player";
import gameRoutes from "./game";
import openaiRoutes from "./openai";
import sentenceRoutes from "./sentence";

router.use("/room", roomRoutes);
router.use("/player", playerRoutes);
router.use("/game", gameRoutes);
router.use("/openai", openaiRoutes);
router.use("/sentence", sentenceRoutes);
export default router;