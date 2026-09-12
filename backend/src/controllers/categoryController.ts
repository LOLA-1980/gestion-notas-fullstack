import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";


const categoryService = new CategoryService();


export class CategoryController {


async getCategories(
req:Request,
res:Response
){

const categories =
await categoryService.getCategories();

res.json(categories);

}



async createCategory(
req:Request,
res:Response
){

const {name}=req.body;


if(!name){

return res.status(400).json({
message:"Category name required"
});

}


const category =
await categoryService.createCategory(name);


res.status(201).json(category);

}



async deleteCategory(
req:Request,
res:Response
){

const id=Number(req.params.id);


await categoryService.deleteCategory(id);


res.status(204).send();

}


}