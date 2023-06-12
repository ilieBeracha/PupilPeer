import express from 'express';
import { chatGptNote } from '../3-logic/openaiLogic';

export const OpenaiRoute = express.Router();

OpenaiRoute.post('/openai/note',async (req,res)=>{
    const body = req.body.content;
    try{
        const results = await chatGptNote(body);
        res.status(200).json(results);
    }catch(e){
        res.status(401).json(e)
    }
})