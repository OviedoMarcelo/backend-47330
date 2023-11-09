import ProductModel from '../models/product_model.js';
import { Exception } from '../../utils.js';

export default class ProductManager {

    static async get(query = {}, options) {
        const criteria = {};
        options.lean = true;
        if (query.product) {
            criteria.product = query.course;
        }
        return ProductModel.find(criteria);
    }

    static async getById(sid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el producto 😨', 404);
        }
        return product;
    }

    static async create(data) {
        const product = await ProductModel.create(data);
        console.log('Producto creado correctamente 😁');
        return product;
    }

    static async updateById(sid, data) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el producto 😨', 404);
        }
        const criteria = { _id: sid };
        const operation = { $set: data };
        await ProductModel.updateOne(criteria, operation);
        console.log('Producto actualizado correctamente 😁');
    }

    static async deleteById(sid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el producto 😨', 404);
        }
        const criteria = { _id: sid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente 😑');
    }
}