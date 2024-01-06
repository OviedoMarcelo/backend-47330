// Order DAO module. It contains functions for CRUD operations.

import OrderModel from '../models/order.model.js'

export default class OrderDao {

    // Create a new user in the database.
    create = (data) => {
        return OrderModel.create(data)
    }

    // Get all users from the database.
    getall = () => {
        return OrderModel.find();
    }

    // Get a user by ID from the database.
    getById = (uid) => {
        return OrderModel.findById(uid);
    }

    // Update a user by ID in the database.
    updateById = (uid, data) => {
        return OrderModel.updateOne({ _id: uid }, { $set: data })
    }

    // Delete a user by ID from the database.
    deleteById = (uid) => {
        return OrderModel.deleteOne({ _id: uid })
    }

}