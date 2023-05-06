import { Room } from "../../db/schema/room";

/**
 * Creates a new Room by a given code
 * @param {String} code Room code
 * @returns the newly created room
 */
const createRoom = async (code) => {
  const dbRoom = new Room({ code });
  await dbRoom.save();
  return dbRoom;
};

/**
 * Queries and retrieve every room in the database
 * @returns list of all rooms
 */
const getAllRooms = async () => {
  return Room.find();
};

/**
 * Queries and retrieve a single room by code
 * @param {String} code Room code
 * @returns list of all rooms
 */
const getRoom = async (code) => {
  const room = await Room.find({ code });
  return room;
};

export { createRoom, getAllRooms, getRoom };
