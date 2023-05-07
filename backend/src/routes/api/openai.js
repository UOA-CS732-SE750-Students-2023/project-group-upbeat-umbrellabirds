import express from "express";
import {
  generatePrompt,
  generateImage,
} from "../../db/endpointFunctions/openai";

const router = express.Router();

router.get("/generate", async (req, res) => {
  try {
    const prompt = await generatePrompt();
    const imageUrl = await generateImage(prompt);
    res.json({ prompt, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

router.get("/generate/:prompt", async (req, res) => {
  try {
    const imageUrl = await generateImage(req.params.prompt);
    res.json(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
