import express from 'express';
import { getChatMessagesByRoom } from '../3-logic/chatLogic';

export const ChatRoute = express.Router();

ChatRoute.get('/chat',async (req,res)=>{
    const roomId = req.query.roomId;
    try{
        const results = await getChatMessagesByRoom(Number(roomId));
        res.status(200).json(results)
    }catch(e){
        res.status(401).json(e)
    }
})