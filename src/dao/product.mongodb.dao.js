// Product DAO module. It contains functions for CRUD operations.
import ProductModel from '../models/product.model.js'

export default class ProductDao {

    // Create a new product in the database.
    static create = (data) => {
        return ProductModel.create(data)
    }

    // Get all products from the database.
    static getAll = () => {
        return ProductModel.find();
    }

    // Get a product by ID from the database.
    static getById = (uid) => {
        return ProductModel.findById(uid);
    }

    // Update a product by ID in the database.
    static updateById = (uid, data) => {
        return ProductModel.updateOne({ _id: uid }, { $set: data })
    }

    // Delete a product by ID from the database.
    static deleteById = (uid) => {
        return ProductModel.deleteOne({ _id: uid })
    }

}