import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
  editGameID,
  addPlayer,
  removePlayer,
  addMessage,
  getMessages,
} from "../../db/endpointFunctions/room";

const router = express.Router();

router.post("/", async (req, res) => {
  const { owner } = req.body;
  const room = await createRoom(owner);
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

router.put("/deletePlayer/:code", async (req, res) => {
  const { playerID } = req.body;
  const room = await removePlayer(req.params.code, playerID);
  if (room) {
    res.status(200).json(room);
  } else {
    res.sendStatus(404);
  }
});

router.put("/message/:id", async (req, res) => {
  const { message } = req.body;
  const game = await addMessage(req.params.id, message);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(404);
  }
});

router.get("/message/:code", async (req, res) => {
  const game = await getMessages(req.params.code);
  if(game) {
    res.status(200).json(game);
  }
  else {
    res.sendStatus(404);
  }
});
