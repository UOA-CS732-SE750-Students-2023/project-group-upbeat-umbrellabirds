import express from "express";
import {
  createGame,
  getAllGames,
  getGame,
  getRound,
  deleteGame,
  addImages,
  incrementRound,
  addGuess,
  getPlayerID,
  getGuesses,
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

router.put("/newImages/:id", async (req, res) => {
  const game = await addImages(req.params.id);
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

router.put("/guess/:id", async (req, res) => {

  const { playerId, guess, roundNumber } = req.body;
  console.log(playerId, guess, roundNumber);
  const game = await addGuess(req.params.id, guess, playerId, roundNumber);
  if (game) {

    res.status(200).json(game);
  } else {
    console.log("error")
    console.log("not found guess")
    res.sendStatus(404);
  }
});

router.get("/guess/:id/:guess/:round", async (req, res) => {
  //get playerID given guess
  const playerID = await getPlayerID(req.params.id, req.params.guess, req.params.round);
  if (playerID) {
    res.status(200).json(playerID);
  }
  else {
    res.sendStatus(404);
  }

});

router.get("/guesses/:id/:round", async (req, res) => {
  //get guesses given round
  const guesses = await getGuesses(req.params.id, req.params.round);
  if (guesses) {
    res.status(200).json(guesses);
  }
  else {
    res.sendStatus(404);
  }
});


export default router;