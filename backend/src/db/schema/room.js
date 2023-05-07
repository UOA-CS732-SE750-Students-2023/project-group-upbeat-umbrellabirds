import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  code: { type: String, required: true },
  playersID: [
    {
      type: String,
    },
  ],
  gameID: { type: String, default: null },
  owner: { type: String, required: true }
});

const Room = mongoose.model("Room", roomSchema);

export { Room };
