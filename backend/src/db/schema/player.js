import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  score: Number,
  guesses: [
    {
      type: String,
    },
  ],
  profileURL: { type: String, required: true },
  lastScore: {type: Number, default: 0},
  lastGuess: {type: String, default: ""}
});

const Player = mongoose.model("Player", playerSchema);

export { Player };
