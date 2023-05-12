import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Room } from './../room';

let mongod;

const roomData = {
    __id: new mongoose.Types.ObjectId('000000000000000000000001'),
    code: "ABC123",
    playersID: ["player1", "player2"],
    gameID: null,
    owner: "player1",
    messages: []
}
const roomData2 = {
    __id: new mongoose.Types.ObjectId('000000000000000000000002'),
    code: "ABC121",
    playersID: ["player1", "player2"],
    gameID: null,
    owner: "player1",
    messages: []
  }
  const roomData3 = {
    __id: new mongoose.Types.ObjectId('000000000000000000000003'),
    code: "ABC122",
    playersID: ["player1", "player2"],
    gameID: null,
    owner: "player1",
    messages: []
  }

  const rooms = [roomData,roomData2,roomData3];
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

    const coll = await mongoose.connection.db.createCollection('rooms');
    await coll.insertMany(rooms);
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

/**
 * Test suite for Room model
 */
it('should save a new room to the database', async () => {
    const roomData4 = {
      code: 'bc3123',
      playersID: ['player3', 'player2'],
      owner: 'player1',
      messages: ["hey"],
    };
    const newRoom = await Room.create(roomData4);
    expect(newRoom._id).toBeDefined();
    expect(newRoom.code).toBe(roomData4.code);
    expect(newRoom.playersID).toEqual(roomData4.playersID);
    expect(newRoom.owner).toBe(roomData4.owner);
    expect(newRoom.messages).toEqual(roomData4.messages);
  });

  it('Cannot save a Room without a required field', async () => {
    const invalidRoom = new Room({
      playersID: ["player1", "player2"],
      gameID: null,
      owner: "player1",
      messages: []
    });
    let err;
    try {
      const savedRoom = await invalidRoom.save();
      error = savedRoom;
    } catch (error) {
      err = error
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.code).toBeDefined();
  });

 it('Get rooms with owner "player1"', async () => {
    const foundRooms = await Room.find({ owner: 'player1' });
    expect(foundRooms).toHaveLength(3);
    expect(foundRooms[0].code).toBe('ABC123');
  });

  test('should delete a room by code', async () => {
    const code = 'ABC123';
    const deletedRoom = await Room.findOneAndDelete({ code });
    const foundRoom = await Room.findOne({ code });
    
    expect(deletedRoom).toBeDefined();
    expect(foundRoom).toBeNull();
  });

  test('Add a new room to the database', async () => {
    const roomData = {
      code: "DEF456",
      playersID: ["player1", "player2", "player3"],
      gameID: null,
      owner: "player1",
      messages: []
    };
    const newRoom = new Room(roomData);
    const savedRoom = await newRoom.save();
    expect(savedRoom.code).toEqual(roomData.code);
    expect(savedRoom.playersID).toEqual(roomData.playersID);
    expect(savedRoom.gameID).toEqual(roomData.gameID);
    expect(savedRoom.owner).toEqual(roomData.owner);
    expect(savedRoom.messages).toEqual(roomData.messages);
  });
  
  test('Update a Room', async () => {
    const room = await Room.findOne({ code: 'ABC123' });
    room.owner = 'player2';
    await room.save();
    
    const updatedRoom = await Room.findOne({ code: 'ABC123' });
    expect(updatedRoom.owner).toBe('player2');
  });
  