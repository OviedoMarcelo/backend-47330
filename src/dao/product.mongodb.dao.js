// Product DAO module. It contains functions for CRUD operations.

import ProductModel from '../models/product.model'

export default class ProductDao {

    // Create a new user in the database.
    create = (data) => {
        return ProductModel.create(data)
    }

    // Get all users from the database.
    getall = () => {
        return ProductModel.find();
    }

    // Get a user by ID from the database.
    getById = (uid) => {
        return ProductModel.findById(uid);
    }

    // Update a user by ID in the database.
    updateById = (uid, data) => {
        return ProductModel.updateOne({ _id: uid }, { $set: data })
    }

    // Delete a user by ID from the database.
    deleteById = (uid) => {
        return ProductModel.deleteOne({ _id: uid })
    }

}