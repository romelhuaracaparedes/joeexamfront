import { Category } from './category';
export class Product {
    id!:number;
    code!:string;
    name!:string;
    price!:number;
    category!:Category;
    description!: string;
}
