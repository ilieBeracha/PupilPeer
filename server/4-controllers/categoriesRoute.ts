import express from 'express';
import { getAllSubCategories } from '../3-logic/categories';


export const CategoriesRoute = express.Router();

CategoriesRoute.get("/sub_categories",async (req,res)=>{
    try{
        const results = await getAllSubCategories();
        res.status(200).json(results)
    }catch(e){
        res.status(401).json(e)
    }
})