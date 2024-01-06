// Product DAO module. It contains functions for CRUD operations.

import ProductModel from '../models/product.model'

export default class ProductDao {

    // Create a new product in the database.
    create = (data) => {
        return ProductModel.create(data)
    }

    // Get all products from the database.
    getall = () => {
        return ProductModel.find();
    }

    // Get a product by ID from the database.
    getById = (uid) => {
        return ProductModel.findById(uid);
    }

    // Update a product by ID in the database.
    updateById = (uid, data) => {
        return ProductModel.updateOne({ _id: uid }, { $set: data })
    }

    // Delete a product by ID from the database.
    deleteById = (uid) => {
        return ProductModel.deleteOne({ _id: uid })
    }

}