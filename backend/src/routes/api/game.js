import express from "express";
import {
  createGame,
  getAllGames,
  getGame,
  getRound,
  deleteGame,
  addImages,
  incrementRound,
} from "../../db/endpointFunctions/game";

const router = express.Router();

router.post("/", async (req, res) => {
  const game = await createGame();
  res.status(200).json(game);
});

router.get("/", async (req, res) => {
  const game = await getAllGames();
  res.json(game);
});

router.get("/:id", async (req, res) => {
  const game = await getGame(req.params.id);
  res.json(game);
});

router.get("/round/:id", async (req, res) => {
  const round = await getRound(req.params.id);
  res.json(round);
});

router.delete("/:id", async (req, res) => {
  const game = await deleteGame(req.params.id);
  if (game) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/newImage/:id", async (req, res) => {
  const { imageURL } = req.body;
  const game = await addImages(req.params.id, imageURL);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(404);
  }
});

router.put("/image/:id", async (req, res) => {
  const { image } = req.body;
  const game = await addImage(req.params.id, image);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(404);
  }
});

router.put("/round/:id", async (req, res) => {
  const game = await incrementRound(req.params.id);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(404);
  }
});
export default router;
