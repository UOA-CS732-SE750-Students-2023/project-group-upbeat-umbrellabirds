import express from "express";
import { checkSentence } from "../../db/endpointFunctions/sentence";

const router = express.Router();

router.get("/check", async (req, res) => {
  const { prompt, guesses } = req.body;
  const score = await checkSentence(prompt, guesses);
  res.json(score);
});

export default router;
