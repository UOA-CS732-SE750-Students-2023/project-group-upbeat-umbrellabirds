import express from "express";
import {
  generatePrompt,
  generateImage,
} from "../../db/endpointFunctions/openai";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();



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

router.put("/download/:prompt", async (req, res) => {
  try {
    const prompt = req.params.prompt;
    const imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-q6wZLx1uAjRwABz2zOrM9QoG/user-lp0Mt3D40yR4JeqrtJXgPqLO/img-BSjRwGXQe0uLRkjCGazF890Q.png?st=2023-05-26T01%3A16%3A21Z&se=2023-05-26T03%3A16%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-26T01%3A03%3A41Z&ske=2023-05-27T01%3A03%3A41Z&sks=b&skv=2021-08-06&sig=b0LPVbhFLmhzDDZ0G0xYaFHn5QMpy%2B7O/gPYrdU82AA%3D"


    try {
      const response = await axios.get(imageUrl,{
          headers: {
            Authorization: `Api-Key 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`,
        },
      },);
      if(!response.ok) {
        throw new Error("Network response was not ok");
      }
      const imageBuffer = await response.buffer();
      const imageData = imageBuffer.toString("base64");

      res.json({imageData})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate image" });
    }

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate prompt" });
  }
});

export default router;
