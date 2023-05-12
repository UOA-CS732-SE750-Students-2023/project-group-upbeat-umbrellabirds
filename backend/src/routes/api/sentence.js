import express from "express";
import { checkSentence } from "../../db/endpointFunctions/sentence";

const router = express.Router();

router.get("/check", async (req, res) => {
  const prompt = req.query.prompt;
  const guesses = req.query.guesses;
  console.log(prompt, guesses);
  const score = await checkSentence(prompt, guesses);
  res.json(score);
});

export default router;