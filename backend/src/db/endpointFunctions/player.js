const RATINGSPOINTS = 600;


import { Player } from "../../db/schema/player";

/**
 * Creates a player
 * @param {String} code Room code
 * @param {url} url is the url to the profile image
 * @returns the newly created player
 */
const createPlayer = async (name, url) => {
  const dbPlayer = new Player({ name: name, score: 0, profileURL: url });
  await dbPlayer.save();
  return dbPlayer;
};

/**
 * Queries and retrieve every player in the database
 * @returns list of all player
 */
const getAllPlayers = async () => {
  return Player.find();
};

/**
 * Queries and retrieve a player from id
 * @param {String} id player's id
 * @returns a single player
 */
const getPlayer = async (id) => {
  const player = await Player.findById(id);
  return player;
};

/**
 * Deletes a Player from the database
 * @param {String} id player's id
 * @returns {Boolean} True if successfully deleted, False if error
 */
const deletePlayer = async (id) => {
  try {
    const player = await Player.findById(id);
    await player.deleteOne();
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Update players score
 * @param {String} id player's id
 * @param {Number} score
 * @returns {Boolean} True if successfully updated, False if error
 */
const updateScore = async (id, score) => {
  try {
    const player = await Player.findById(id)
    const curScore = player.score;
    const newScore = curScore + score;
    console.log(player.score, score, "old score plus addition")
    console.log('here new score', newScore)
    
    await Player.updateOne({ _id: id }, { score: newScore, lastScore: score});
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * gets the players score
 * @param {String} id player's id
 * @returns player's score
 */
const getScore = async (id) => {
  const player = await Player.findById(id);
  return player.score;
};

/**
 * Adds new guess to the guess list
 * @param {String} id player's id
 * @param {String} guess players recents guess
 * @returns {Boolean} True if successfully updated, False if error
 */
const addGuess = async (id, guess) => {
  try {
    await Player.updateOne({ _id: id }, { $push: { guesses: guess } });
    return true;
  } catch (e) {
    return false;
  }
};

const addRatingPoints = async (id) => {
  try {
    const player = await Player.findById(id)
    const curScore = player.score;
    const newScore = curScore + RATINGSPOINTS;
    
    await Player.updateOne({ _id: id }, { score: newScore});
    return newScore;
  } catch (e) {
    return false;
  }
}

export {
  createPlayer,
  getAllPlayers,
  getPlayer,
  deletePlayer,
  updateScore,
  getScore,
  addGuess,
  addRatingPoints,
};
