import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
  editGameID,
  addPlayer,
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

router.put("/:code", async (req, res) => {
  const { gameID } = req.body;
  const room = await editGameID(req.params.code, gameID);
  if (room) {
    res.status(200).json(room);
  } else {
    res.sendStatus(404);
  }
});

router.put("/newPlayer/:code", async (req, res) => {
  const { playerID } = req.body;
  const room = await addPlayer(req.params.code, playerID);
  if (room) {
    res.status(200).json(room);
  } else {
    res.sendStatus(404);
  }
});
export default router;
