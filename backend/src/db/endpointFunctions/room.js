import { Room } from "../../db/schema/room";


/**helper functions */
const makeId = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let length = 6;
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
/**
 * Creates a new Room by a given code
 * @param {String} code Room code
 * @returns the newly created room
 */
const createRoom = async (owner) => {
  let code = makeId();
  let existingRoom = await Room.findOne({ code });

  while (existingRoom) {
    code = makeId();
    existingRoom = await Room.findOne({ code });
  }

  const dbRoom = new Room({ code, owner });

  dbRoom.playersID.push(owner);
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

/**
 * Adds new player to the array
 * @param {String} code the room's code
 * @param {String} playerID
 * @returns {Boolean} True if successfully deleted, False if error
 */
const addPlayer = async (code, playerID) => {
  try {
    await Room.updateOne({ code: code }, { $push: { playersID: playerID } });
    return true;
  } catch (e) {
    return false;
  }
};


/** Removes player from array
 * @param {String} code the room's code
 * @param {String} playerID
 * @returns {Boolean} True if successfully deleted, False if error
 */
const removePlayer = async (code, playerID) => {
  try {
    await Room.updateOne({ code: code }, { $pull: { playersID: playerID } });
    return true;
  } catch (e) {
    return false;
  }
};
const addMessage = async (id, message) => {
  try {
    await Room.updateOne({ _id: id }, { $push: { messages: message } });
    return true;
  } catch (e) {
    return false;
  }
};

const getMessages = async (code) => {
  try{
  const room = await Room.findOne({ code });
  return room.messages;
  } catch (e) {
    return false;
  }
};




export { createRoom, getAllRooms, getRoom, deleteRoom, editGameID, addPlayer, removePlayer, addMessage, getMessages };