import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  images: [
    {
      type: Object,
    },
  ],
  round: number,
});

const Game = mongoose.model("Game", gameSchema);

export { Game };
