import { Game } from "../../db/schema/game";
import { generatePrompt, generateImage } from "../endpointFunctions/openai";
/**
 * Creates a game, generates 1 images and saves it.
 * @returns the newly created game
 */
const createGame = async () => {
  let dbGame = new Game();

  const prompt = await generatePrompt();
  const url = await generateImage(prompt);
  const newImage = {
    url: url,
    prompt: prompt,
  };
  console.log(newImage);
  dbGame.images.push(newImage);
  await dbGame.save();

  let game = await Game.findById(dbGame._id);
  return game._id;
};

/**
 * addes game's image array
 * @param {String} id game's id
 * @returns game
 */
const addImages = async (id) => {
  const game = await Game.findById(id);

  for (let i = 0; i < 4; i++) {
    const prompt = await generatePrompt();
    const url = await generateImage(prompt);
    const newImage = {
      url: url,
      prompt: prompt
    }
    console.log(newImage);
    game.images.push(newImage);
    await game.save();
  }

  return game;
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
  return game.rounds.length;
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
 * Increment game's round number
 * @param {String} id game's id
 * @returns {Boolean} True if successfully updated, False if error
 */
const incrementRound = async (id) => {
  try {
    let game = await Game.findById(id);

    const roundNum = game.rounds.length + 1;
    // console.log(game, roundNum);

    const newRound = { roundNum, guesses: [] };

    await game.updateOne({ $push: { rounds: newRound } });
    await game.save();

    game = await Game.findById(id);
    // console.log(game)
    return game;
  } catch (e) {
    return false;
  }
};

const addGuess = async (id, guess, playerId, roundNumber) => {
  try {
    let game = await Game.findById(id);
    if (!game) {
      console.log("couldnt find game");
      throw new Error('Game not found');
    }
    
    const roundNum = roundNumber - 1;
    const round = game.rounds[roundNum];
    // console.log(round, roundNumber);
    if (!round) {
      console.log("couldnt find round")
      throw new Error('Round not found');
    }

    const guesses = round.guesses;

    const playerExists = round.guesses.find((g) => g.playerID === playerId);

    if (playerExists) {
      throw new Error('Player already exists');
    }
   
    const newGuess = { guess: guess, playerID: playerId };

    
    await game.rounds[roundNumber - 1].guesses.push(newGuess);

    await game.save();
    return true;
  }
  catch (e) {
    console.log('Error:', e);
    return false;
  }
}

const getPlayerID = async (id, guess, roundNumber) => {
  try{
    let game = await Game.findById(id);
    if (!game) {
      throw new Error('Game not found');
    }
    const round = game.rounds[roundNumber - 1];
    // console.log(round);
    if (!round) {
      throw new Error('Round not found');
    }
    //find guess in round
    const guessData = round.guesses.find((guessData) => guessData.guess === guess);
    if (!guessData) {
      throw new Error('Guess not found');
    }
    return guessData.playerID;
  }
  catch (e) {
    console.log('Error:', e);
    return false;
  }
};

const getGuesses = async (id, roundNumber) => { 
  try {
    let game = await Game.findById(id);
    let guesses = game.rounds[roundNumber - 1].guesses;
    return guesses;
  }
  catch (e) {
    console.log('Error:', e);
    return false;
  }
}

const getImages = async (id) => {
  try {
    let game = await Game.findById(id);
    return game.images;
  }
  catch (e) {
    console.log('Error:', e);
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
  addGuess,
  getPlayerID,
  getGuesses,
  getImages,
};