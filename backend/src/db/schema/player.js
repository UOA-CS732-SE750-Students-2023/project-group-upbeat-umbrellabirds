import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: { type: String, required: true },
    score: number,
    guesses:[
        {
          type: String,
        },
      ],
    profileURL: {type: String, required: true }
    
    
});

const Player = mongoose.model("Player", playerSchema);

export { Player }