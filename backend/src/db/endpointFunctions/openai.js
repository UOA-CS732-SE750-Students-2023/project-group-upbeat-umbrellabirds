import dotenv from "dotenv";
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Generate a sentence to produce funny and unique image. Make the prompt detailed",
    temperature: 1,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  return response.data.choices[0].text.trim().replace(/\n/g, "");
};

const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt,
    size: "1024x1024",
    response_format: "url",
    n: 1,
  });

  return response.data.data[0].url;
};

export { generatePrompt, generateImage };