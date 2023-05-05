import express from 'express';
import { Room } from '../../db/schema/room';

const router = express.Router();

const createRoom= async (code) => {
    const dbRoom= new Room({code});
    await dbRoom.save();
    return dbRoom;
        
  };

router.post('/', async (req, res) => {

    const { code } = req.body


    const room = await createRoom(code);
    return res.status(200).json(room)
});

export default router