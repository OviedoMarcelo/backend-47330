import CartModel from '../models/cart_model.js';
import { Exception } from '../../utils.js';

export default class CartManager {

    static async get(query = {}, options) {
        const criteria = {};
        if (query.cart) {
            criteria.cart = query.cart;
        }
        return CartModel.find(criteria);
    }

    static async getById(sid) {
        const cart = await CartModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el carrito de compras 😨', 404);
        }
        return cart;
    }

    static async create(data) {
        const cart = await CartModel.create(data);
        console.log('Carrito creado correctamente 😁');
        return cart;
    }

    static async updateById(sid, data) {
        const cart = await CartModel.findById(sid);
        if (!cart) {
            throw new Exception('No existe el carrito de compras 😨', 404);
        }
        const criteria = { _id: sid };
        const operation = { $set: data };
        await ProductModel.updateOne(criteria, operation);
        console.log('Carro de compras actualizado correctamente 😁');
    }

    static async deleteById(sid) {
        const cart = await CartModel.findById(sid);
        if (!cart) {
            throw new Exception('No existe el carrito de compras 😨', 404);
        }
        const criteria = { _id: sid };
        await ProductModel.deleteOne(criteria);
        console.log('Carrito eliminado correctamente 😑');
    }
}