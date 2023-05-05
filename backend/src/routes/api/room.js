import express from "express";
import { createRoom } from "../../db/endpointFunctions/room";

const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  const room = await createRoom(code);
  return res.status(200).json(room);
});

export default router;
