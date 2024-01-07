import ProductService from '../dao/product.mongodb.dao.js'
import { NotFoundException } from '../utils.js';


export default class ProductController {

    static create = async (data) => {
        console.log('method create called 🎈')
        return ProductService.create(data)
    };

    static getById = async (pid) => {
        console.log('method getById called 🎈')
        const product = await ProductService.getById(pid);
        if (!product) {
            throw new NotFoundException('Not found');
        }
        return product;
    };


    static getAll = async () => {
        console.log('method getAll called 🎈');
        return ProductService.getAll();
    };


    static updateById = async (pid, data) => {
        console.log('method updateById called 🎈');
        return ProductService.updateById(pid, data);
    };

}