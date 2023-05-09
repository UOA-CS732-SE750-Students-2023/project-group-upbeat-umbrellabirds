import { Game } from "../../db/schema/game";

/**
 * Creates a game
 * @param {Array} images array of image objects
 * @param {Number} round number of rounds
 * @returns the newly created game
 */
const createGame = async () => {
  const dbGame = new Game();
  await dbGame.save();
  console.log(`New game created with ID: ${dbGame._id}`);
  return dbGame;
};

/**
 * Queries and retrieves every game in the database
 * @returns list of all games
 */
const getAllGames = async () => {
  return Game.find();
};

/**
 * Queries and retrieves a game from id
 * @param {String} id game's id
 * @returns a single game
 */
const getGame = async (id) => {
  const game = await Game.findById(id);
  return game;
};

/**
 * Queries and retrieves current round
 * @param {String} id game's id
 * @returns a current round
 */
const getRound = async (id) => {
  const game = await Game.findById(id);
  return game.round;
};

/**
 * Deletes a game from the database
 * @param {String} id game's id
 * @returns {Boolean} True if successfully deleted, False if error
 */
const deleteGame = async (id) => {
  try {
    const game = await Game.findById(id);
    await game.deleteOne();
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * addes game's image array
 * @param {String} id game's id
 * @param {Array} images image URL
 * @returns {Boolean} True if successfully updated, False if error
 */
const addImages = async (id, imageURL) => {
  try {
    await Game.updateOne({ _id: id }, { $push: { images: imageURL } });
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Increment game's round number
 * @param {String} id game's id
 * @returns {Boolean} True if successfully updated, False if error
 */
const incrementRound = async (id) => {
  const game = await Game.findById(id);
  const round = game.round;
  try {
    await Game.updateOne({ _id: id }, { round: round + 1 });
    return true;
  } catch (e) {
    return false;
  }
};

export {
  createGame,
  getAllGames,
  getGame,
  getRound,
  deleteGame,
  addImages,
  incrementRound,
};
