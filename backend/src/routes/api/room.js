import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
} from "../../db/endpointFunctions/room";

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

router.get("/:code", async (req, res) => {
  const room = await getRoom(req.params.code);
  res.json(room);
});

router.delete("/:code", async (req, res) => {
  const room = await deleteRoom(req.params.code);
  if (room) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
export default router;
