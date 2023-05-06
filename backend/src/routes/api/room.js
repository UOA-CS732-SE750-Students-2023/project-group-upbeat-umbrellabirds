import express from "express";
import { createRoom, getAllRooms } from "../../db/endpointFunctions/room";

const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  const room = await createRoom(code);
  res.status(200).json(room);
});

router.get("/", async (req, res) => {
  const allRooms = await getAllRooms();
  res.json(allRooms);
});

export default router;
