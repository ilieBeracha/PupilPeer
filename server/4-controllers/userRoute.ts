import express from 'express';
import { googleLogin } from '../3-logic/usersLogic';
import { generateToken } from '../helpers/jwt';

export const UserRoute = express.Router();

UserRoute.post('/googlelogin', async (req, res) => {
    const user = req.body;
    try {
        const response = await googleLogin(user)
        console.log(response);
        if (response.length > 0) {
            user.id = response[0].id;
            const token = await generateToken(user)
            res.status(200).json(token)
        }else{
            user.id = response.insertId;
            const token = await generateToken(user)
            res.status(200).json(token)
        }

    } catch (e) {
        res.status(400).json(e)
    }
})