import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL =
  "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

const headers = {
  Authorization: `Bearer ` + process.env.HUGGING_FACE_KEY,
};

async function query(payload) {
  try {
    const response = await axios.post(API_URL, payload, { headers });
    // console.log(response.data);
    const data = response.data;
    return data;
  } catch (error) {
    // console.error(error);
  }
}

const checkSentence = async (prompt, guesses) => {
  const data = await query({
    inputs: {
      source_sentence: prompt,
      sentences: guesses,
    },
  });
  return data;
};

export { checkSentence };
