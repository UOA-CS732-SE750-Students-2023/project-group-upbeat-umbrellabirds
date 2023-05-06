import express from "express";
import {
  createPlayer,
  getAllPlayers,
  getPlayer,
  deletePlayer,
  updateScore,
  getScore,
  addGuess,
} from "../../db/endpointFunctions/player";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, url } = req.body;

  const player = await createPlayer(name, url);
  res.status(200).json(player);
});

router.get("/", async (req, res) => {
  const allPlayers = await getAllPlayers();
  res.json(allPlayers);
});

router.get("/:id", async (req, res) => {
  const player = await getPlayer(req.params.id);
  res.json(player);
});

router.get("/score/:id", async (req, res) => {
  const score = await getScore(req.params.id);
  res.json(score);
});

router.delete("/:id", async (req, res) => {
  const player = await deletePlayer(req.params.id);
  if (player) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res) => {
  const { score } = req.body;
  const player = await updateScore(req.params.id, score);
  if (player) {
    res.status(200).json(player);
  } else {
    res.sendStatus(404);
  }
});

router.put("/guesses/:id", async (req, res) => {
  const { guess } = req.body;
  const player = await addGuess(req.params.id, guess);
  if (player) {
    res.status(200).json(player);
  } else {
    res.sendStatus(404);
  }
});
export default router;
