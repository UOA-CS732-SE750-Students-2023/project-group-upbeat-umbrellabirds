import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guessSchema = new Schema({
  playerID: {
    type: String,
    required: true
  },
  guess: {
    type: String,
    required: true
  }
});

const roundSchema = new Schema({
  roundNum: {
    type: Number,
    required: true
  },
  guesses: {
    type: [guessSchema],
    required: true,
    default: []
  }
});

const imageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  }
});

const gameSchema = new Schema({
  images: {
    type: [imageSchema],
    required: true,
    default: []
  },
  rounds: {
    type: [roundSchema],
    required: true,
    default: []
  }
});

const Game = mongoose.model('Game', gameSchema);

export { Game };
