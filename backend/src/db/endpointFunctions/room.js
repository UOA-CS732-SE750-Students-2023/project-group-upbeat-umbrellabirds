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
  const room = await Room.findOne({ code });
  return room;
};

/**
 * Deletes a room from the database
 * @param {String} code the room's code
 * @returns {Boolean} True if successfully deleted, False if error
 */
const deleteRoom = async (code) => {
  try {
    const room = await Room.findOne({ code });
    await room.deleteOne();
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Edits the gameID
 * @param {String} code the room's code
 * @param {String} gameID the game id
 * @returns {Boolean} True if successfully deleted, False if error
 */
const editGameID = async (code, gameID) => {
  try {
    await Room.updateOne({ code: code }, { gameID: gameID });
    return true;
  } catch (e) {
    return false;
  }
};

export { createRoom, getAllRooms, getRoom, deleteRoom, editGameID };
