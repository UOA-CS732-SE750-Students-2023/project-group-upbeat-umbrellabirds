import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    code: { type: String, required: true },
    playersID:[
        {
          type: String,
        },
      ],
    gameID: String
    
});

const Room = mongoose.model("Room", roomSchema);

export { Room }