import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Game } from "./../game";

let mongod;

const testGame = {
  images: [
    {
      url: "https://example.com/image1.jpg",
      prompt: "Name this fruit",
    },
    {
      url: "https://example.com/image2.jpg",
      prompt: "Name this animal",
    },
  ],
  rounds: [
    {
      roundNum: 1,
      guesses: [
        {
          playerID: "abc123",
          guess: "apple",
        },
        {
          playerID: "def456",
          guess: "banana",
        },
      ],
    },
    {
      roundNum: 2,
      guesses: [
        {
          playerID: "abc123",
          guess: "lion",
        },
        {
          playerID: "def456",
          guess: "tiger",
        },
      ],
    },
  ],
};

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

  await Game.create(testGame);
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("should create a new game with default values", async () => {
  const newGame = new Game();
  const savedGame = await newGame.save();

  expect(savedGame.images).toHaveLength(0);
  expect(savedGame.rounds).toHaveLength(0);
});

it("should save a game with images and rounds", async () => {
  const newGame = new Game(testGame);
  const savedGame = await newGame.save();

  expect(savedGame.images).toHaveLength(2);
  expect(savedGame.rounds).toHaveLength(2);
  expect(savedGame.rounds[0].guesses).toHaveLength(2);
  expect(savedGame.rounds[1].guesses).toHaveLength(2);
});

it("should find a game by image URL", async () => {
  const foundGame = await Game.findOne({
    "images.url": "https://example.com/image1.jpg",
  });

  expect(foundGame.images).toHaveLength(2);
  expect(foundGame.rounds).toHaveLength(2);
  expect(foundGame.rounds[0].guesses).toHaveLength(2);
  expect(foundGame.rounds[1].guesses).toHaveLength(2);
});

it("should add a new round to a game", async () => {
  const game = await Game.findOne({
    "images.url": "https://example.com/image1.jpg",
  });

  const newRound = {
    roundNum: 3,
    guesses: [
      {
        playerID: "ghi789",
        guess: "orange",
      },
      {
        playerID: "jkl012",
        guess: "pear",
      },
    ],
  };

  game.rounds.push(newRound);
  const updatedGame = await game.save();

  expect(updatedGame.rounds).toHaveLength(3);
  expect(updatedGame.rounds[2].roundNum).toBe(3);
});

it("should create a game with valid image and round data", async () => {
  const gameData = {
    images: [
      { url: "https://example.com/image1", prompt: "Guess what this is" },
      { url: "https://example.com/image2", prompt: "What animal is this" },
    ],
    rounds: [
      {
        roundNum: 1,
        guesses: [
          { playerID: "123", guess: "apple" },
          { playerID: "456", guess: "banana" },
        ],
      },
      {
        roundNum: 2,
        guesses: [
          { playerID: "123", guess: "dog" },
          { playerID: "456", guess: "cat" },
        ],
      },
    ],
  };
  const game = new Game(gameData);
  await expect(game.save()).resolves.toBe(game);
});

it("should fail to create a game with missing image data", async () => {
  const gameData = {
    images: [{ url: "https://example.com/image1" }],
    rounds: [
      {
        roundNum: 1,
        guesses: [
          { playerID: "123", guess: "apple" },
          { playerID: "456", guess: "banana" },
        ],
      },
    ],
  };
  const game = new Game(gameData);
  await expect(game.save()).rejects.toThrow("Game validation failed");
});

it('Create a game with no images or rounds', async () => {
    const game = new Game();
    await game.save();
  
    const foundGame = await Game.findById(game._id);
    expect(foundGame).toBeDefined();
    expect(foundGame.images).toHaveLength(0);
    expect(foundGame.rounds).toHaveLength(0);
  });
  
  it('Add an image to an existing game', async () => {
    const game = new Game();
    await game.save();
  
    const newImage = { url: 'https://example.com/image3', prompt: 'Guess what this is?' };
    game.images.push(newImage);
    await game.save();
  
    const foundGame = await Game.findById(game._id);
    expect(foundGame.images).toHaveLength(1);
    expect(foundGame.images[0].url).toBe(newImage.url);
  });
  
  it('Add a new round with guesses to an existing game', async () => {
    const game = new Game();
    await game.save();
  
    const newRound = { roundNum: 3, guesses: [{ playerID: 'player1', guess: 'banana' }, { playerID: 'player2', guess: 'apple' }] };
    game.rounds.push(newRound);
    await game.save();
  
    const foundGame = await Game.findById(game._id);
    expect(foundGame.rounds).toHaveLength(1);
    expect(foundGame.rounds[0].roundNum).toBe(newRound.roundNum);
    expect(foundGame.rounds[0].guesses).toHaveLength(newRound.guesses.length);
    expect(foundGame.rounds[0].guesses[0].playerID).toBe(newRound.guesses[0].playerID);
    expect(foundGame.rounds[0].guesses[0].guess).toBe(newRound.guesses[0].guess);
  });
  
  it('Delete an image from an existing game', async () => {
    const game = new Game({ images: [{ url: 'https://example.com/image1', prompt: 'What is this?' }, { url: 'https://example.com/image2', prompt: 'Guess this!' }] });
    await game.save();
  
    game.images.splice(0, 1);
    await game.save();
  
    const foundGame = await Game.findById(game._id);
    expect(foundGame.images).toHaveLength(1);
    expect(foundGame.images[0].url).toBe('https://example.com/image2');
  });

  it('Delete a round from an existing game', async () => {
    const game = new Game({ rounds: [{ roundNum: 1, guesses: [{ playerID: 'player1', guess: 'apple' }] }, { roundNum: 2, guesses: [{ playerID: 'player2', guess: 'banana' }] }] });
    await game.save();
  
    game.rounds.splice(0, 1);
    await game.save();
  
    const foundGame = await Game.findById(game._id);
    expect(foundGame.rounds).toHaveLength(1);
    expect(foundGame.rounds[0].roundNum).toBe(2);
  });
  
  