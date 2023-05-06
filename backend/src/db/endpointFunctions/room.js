import { Room } from "../../db/schema/room";

const createRoom = async (code) => {
  const dbRoom = new Room({ code });
  await dbRoom.save();
  return dbRoom;
};

const getAllRooms = async () => {
  return Room.find();
};

export { createRoom, getAllRooms };
