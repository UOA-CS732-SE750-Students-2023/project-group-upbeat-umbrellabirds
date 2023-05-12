import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Player } from "./../player";

let mongod;

const Players = [
  {
    name: "John Doe",
    score: 50,
    guesses: ["apple", "banana", "orange"],
    profileURL: "https://example.com/johndoe",
  },
  {
    name: "Jane Smith",
    score: 75,
    guesses: ["grape", "kiwi", "peach"],
    profileURL: "https://example.com/janesmith",
  },
  {
    name: "Bob Johnson",
    score: 100,
    guesses: ["watermelon", "pineapple", "mango"],
    profileURL: "https://example.com/bobjohnson",
  },
];

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
  // Drop existing collections
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("players");
  await coll.insertMany(Players);
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

/**
 * Test suite for Player model
 */
it('Create a new Player with valid data', async () => {
  const playerData = {
    name: 'New Player',
    score: 90,
    guesses: ['kiwi', 'orange', 'banana'],
    profileURL: 'https://example.com/newplayer',
  };
  const newPlayer = await Player.create(playerData);
  expect(newPlayer.name).toBe(playerData.name);
  expect(newPlayer.score).toBe(playerData.score);
  expect(newPlayer.guesses).toEqual(playerData.guesses);
  expect(newPlayer.profileURL).toBe(playerData.profileURL);
});

it('Fail to create a new Player with missing required data', async () => {
  const playerData = {
    name: 'New Player',
    guesses: ['kiwi', 'orange', 'banana'],
    profileURL: 'https://example.com/newplayer',
  };
  try {
    const newPlayer = await Player.create(playerData);
    expect(newPlayer).toBeNull();
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it('Update an existing Player\'s score', async () => {
  const playerToUpdate = await Player.findOne({ name: 'John Doe' });
  const newScore = 80;
  playerToUpdate.score = newScore;
  const updatedPlayer = await playerToUpdate.save();
  expect(updatedPlayer.score).toBe(newScore);
});

it('Delete an existing Player', async () => {
  const playerToDelete = await Player.findOne({ name: 'Bob Johnson' });
  await playerToDelete.remove();
  const deletedPlayer = await Player.findOne({ name: 'Bob Johnson' });
  expect(deletedPlayer).toBeNull();
});

it('Find a Player by profile URL', async () => {
  const profileURL = 'https://example.com/bobjohnson';
  const foundPlayer = await Player.findOne({ profileURL });
  expect(foundPlayer.name).toBe('Bob Johnson');
});

it('Get all players', async () => {
  const allPlayers = await Player.find();
  expect(allPlayers).toHaveLength(3);
});

it('Get player with score of 50', async () => {
  const foundPlayers = await Player.find({ score: 50 });
  expect(foundPlayers).toHaveLength(1);
  expect(foundPlayers[0].name).toBe('John Doe');
});
