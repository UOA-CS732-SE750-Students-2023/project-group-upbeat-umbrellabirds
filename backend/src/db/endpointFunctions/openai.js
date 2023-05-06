import dotenv from "dotenv";
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.apiKey,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Create a 10 word sentence to produce a creative and interesting/weird/wacky/stupid/funny image",
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  return response.data.choices[0].text;
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
