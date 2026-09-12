import { CategoryRepository } from "../repositories/categoryRepository";


export class CategoryService {


private categoryRepository: CategoryRepository;


constructor(){

 this.categoryRepository = new CategoryRepository();

}


async getCategories(){

 return this.categoryRepository.findAll();

}


async createCategory(name:string){

 return this.categoryRepository.create(name);

}


async deleteCategory(id:number){

 return this.categoryRepository.delete(id);

}


}