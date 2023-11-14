import ProductModel from '../models/product_model.js';
import { Exception } from '../../utils.js';

export default class ProductManager {

    constructor() {
        console.log('Create a product instance')
    }

    static async get (query = {}, options) {
        options.lean = true;
        const products = await ProductModel.paginate(query, options);
        return ({
            payload: products.docs,
            totalPage: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/home?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/home?page=${products.nextPage}` : null,
        });
    }


    static async getById(pid) {
        const product = await ProductModel.findById(pid).lean();
        if (!product) {
            throw new Exception('No existe el producto 😨', 404);
        }
        return product;
    }

    static async create(data) {
        const result = await ProductModel.create(data);
        console.log('Producto creado correctamente 😁');
        return product;
    }


    static async updateById(pid, data) {
        const result = await ProductModel.findByIdAndUpdate(id, productUpdated, { new: true });
        console.log('Producto actualizado correctamente 😁');
        return result;
    }


    static async deleteById(pid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el producto 😨', 404);
        }
        const criteria = { _id: pid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente 😑');
    }
}